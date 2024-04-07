CREATE TABLE Users (
    UserID int AUTO_INCREMENT PRIMARY KEY,
    Username varchar(255),
    Email varchar(255) UNIQUE,
    Password varchar(255),
    UserType ENUM('Admin', 'Normal'),
    RegistrationDate datetime,
    LastLoginDate datetime,
    IsBlocked boolean,
	OverallRating decimal(3, 2)
);

-- PaymentMethods Table (needs to exist before Transactions)
CREATE TABLE PaymentMethods (
    MethodID int PRIMARY KEY,
    MethodName varchar(255),
    MethodType ENUM('Online', 'Offline'),
    Description varchar(255),
    Status boolean
);

-- Other tables that depend on Users but not on PaymentMethods can be created here
-- WhiskyDetails Table
CREATE TABLE WhiskyDetails (
	ItemID int AUTO_INCREMENT PRIMARY KEY,
    SellerID int,
    StartPrice decimal(10, 2),
    BuyNowPrice decimal(10, 2),
    Description text,
    AuctionStatus ENUM('Active', 'Inactive', 'Canceled'),
    StartTime datetime,
    EndTime datetime,
    Category varchar(255),
    Availability BOOLEAN,
    `Condition` ENUM('Unopened', 'OpenedButSealed', 'OpenedWithoutSeal'),
    TastingNotes text,
    Region varchar(255),
    FOREIGN KEY (SellerID) REFERENCES Users(UserID)
);

CREATE TABLE Bids (
    BidID int AUTO_INCREMENT PRIMARY KEY,
    ItemID int,
    BidderID int,
    BidAmount decimal(10, 2),
    BidTime datetime,
    FOREIGN KEY (ItemID) REFERENCES WhiskyDetails(ItemID),
    FOREIGN KEY (BidderID) REFERENCES Users(UserID)
);

-- Then create the Transactions table
CREATE TABLE Transactions (
    TransactionID int AUTO_INCREMENT PRIMARY KEY,
    ItemID int,
    BuyerID int,
    SellerID int,
    FinalPrice decimal(10, 2),
    TransactionStatus ENUM('Initiated', 'Completed', 'Cancelled'),
    PaymentStatus ENUM('Pending', 'Completed', 'Failed'),
    PaymentMethodID int,
    UPSTrackingNumber varchar(255),
    TransactionDate datetime,
    FOREIGN KEY (ItemID) REFERENCES WhiskyDetails(ItemID),
    FOREIGN KEY (BuyerID) REFERENCES Users(UserID),
    FOREIGN KEY (SellerID) REFERENCES Users(UserID),
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethods(MethodID)
);


CREATE TABLE Reviews (
    ReviewID int AUTO_INCREMENT PRIMARY KEY,
    ReviewerID int,
    RevieweeID int,
    ItemID int,
    Rating decimal(3, 2),
    Comment text,
    CommentTime datetime,
    IsDeleted boolean,
    FOREIGN KEY (ReviewerID) REFERENCES Users(UserID),
    FOREIGN KEY (RevieweeID) REFERENCES Users(UserID),
    FOREIGN KEY (ItemID) REFERENCES WhiskyDetails(ItemID)
);

CREATE TABLE Messages (
    MessageID int AUTO_INCREMENT PRIMARY KEY,
    SenderID int,
    ReceiverID int,
    Content text,
    SendTime datetime,
    IsSensitive boolean,
    RelatedItemID int,
    FOREIGN KEY (SenderID) REFERENCES Users(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES Users(UserID),
    FOREIGN KEY (RelatedItemID) REFERENCES WhiskyDetails(ItemID)
);

CREATE TABLE ForumPosts (
    PostID int AUTO_INCREMENT PRIMARY KEY,
    AuthorID int,
    Content text,
    PostTime datetime,
    IsDeleted boolean,
    FOREIGN KEY (AuthorID) REFERENCES Users(UserID)
);

CREATE TABLE Reports (
    ReportID int AUTO_INCREMENT PRIMARY KEY,
    CreatorID int,
    ReportedUserID int,
    ReportType varchar(255),
    Content text,
    CreationTime datetime,
    FOREIGN KEY (CreatorID) REFERENCES Users(UserID),
    FOREIGN KEY (ReportedUserID) REFERENCES Users(UserID)
);

CREATE TABLE Recommendations (
    RecommendationID int AUTO_INCREMENT PRIMARY KEY,
    UserID int,
    RecommendedItemID int,
    CreatedDateTime datetime,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (RecommendedItemID) REFERENCES WhiskyDetails(ItemID)
);



CREATE TABLE OfflinePayments (
    OfflinePaymentID int PRIMARY KEY,
    TransactionID int,
    MethodID int,
    Details varchar(255),
    ReceivedDate datetime,
    FOREIGN KEY (TransactionID) REFERENCES Transactions(TransactionID),
    FOREIGN KEY (MethodID) REFERENCES PaymentMethods(MethodID)
);

-- update this status after transaction
DELIMITER $$
CREATE TRIGGER UpdateAuctionStatusAfterTransaction
AFTER UPDATE ON Transactions
FOR EACH ROW
BEGIN
  IF NEW.TransactionStatus = 'Completed' THEN
    UPDATE WhiskyDetails
    SET AuctionStatus = 'Inactive'
    WHERE ItemID = NEW.ItemID;
  END IF;
END$$

DELIMITER ;



DELIMITER $$

-- one someone input new rating, update overall rating
CREATE TRIGGER UpdateUserOverallRatingAfterReviewUpdate
AFTER UPDATE ON Reviews
FOR EACH ROW
BEGIN
    DECLARE avgRating DECIMAL(3, 2);
    
    -- Calculate the new average rating for the reviewee, only considering non-deleted reviews
    SELECT AVG(Rating) INTO avgRating
    FROM Reviews
    WHERE RevieweeID = NEW.RevieweeID AND IsDeleted = FALSE;
    
    -- Update the Users table with the new average rating
    UPDATE Users
    SET OverallRating = avgRating
    WHERE UserID = NEW.RevieweeID;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER UpdateUserOverallRatingAfterReviewInsert
AFTER INSERT ON Reviews
FOR EACH ROW
BEGIN
    DECLARE avgRating DECIMAL(3, 2);
    
    -- Calculate the new average rating for the reviewee, considering only non-deleted reviews
    SELECT AVG(Rating) INTO avgRating
    FROM Reviews
    WHERE RevieweeID = NEW.RevieweeID AND IsDeleted = FALSE;
    
    -- Update the Users table with the new average rating
    UPDATE Users
    SET OverallRating = avgRating
    WHERE UserID = NEW.RevieweeID;
END$$

DELIMITER ;






--  Block User Procedure: A procedure to block a user and cancel their active auctions and transactions

DELIMITER $$

CREATE PROCEDURE BlockUser(IN b_userID INT)
BEGIN
    -- Check if the user exists
    DECLARE userExists INT;
    SELECT COUNT(*) INTO userExists FROM Users WHERE UserID = b_userID;
    IF userExists = 0 THEN
        -- If the user does not exist
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User does not exist.';
    END IF;
    
    -- Block the user
    UPDATE Users
    SET IsBlocked = TRUE
    WHERE UserID = b_userID;
    
    -- Cancel initiated transactions where the user is the seller
    UPDATE Transactions
    SET TransactionStatus = 'Cancelled'
    WHERE SellerID = b_userID AND TransactionStatus = 'Initiated';
    
    -- Cancel active auctions where the user is the seller
    UPDATE WhiskyDetails
    SET AuctionStatus = 'Canceled'
    WHERE SellerID = b_userID AND AuctionStatus = 'Active';
    
    -- Optionally, if there's any cleanup or additional logging required, include it here
    -- For example, logging the block action, notifying the user, etc.
END$$

DELIMITER ;

CREATE VIEW UserOverview AS
SELECT
    u.UserID,
    u.Username,
    u.Email,
    COUNT(DISTINCT wd.ItemID) AS AuctionsInitiated,
    COUNT(DISTINCT t.TransactionID) AS TransactionsCompleted,
    u.OverallRating
FROM
    Users u
LEFT JOIN WhiskyDetails wd ON u.UserID = wd.SellerID
LEFT JOIN Transactions t ON u.UserID = t.SellerID AND t.TransactionStatus = 'Completed'
GROUP BY
    u.UserID;

ALTER TABLE WhiskyDetails ADD COLUMN HighestBid DECIMAL(10, 2);


