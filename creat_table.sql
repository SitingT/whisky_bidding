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
    BidID int PRIMARY KEY,
    ItemID int,
    BidderID int,
    BidAmount decimal(10, 2),
    BidTime datetime,
    FOREIGN KEY (ItemID) REFERENCES WhiskyDetails(ItemID),
    FOREIGN KEY (BidderID) REFERENCES Users(UserID)
);

-- Then create the Transactions table
CREATE TABLE Transactions (
    TransactionID int PRIMARY KEY,
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
    ReviewID int PRIMARY KEY,
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
    MessageID int PRIMARY KEY,
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
    PostID int PRIMARY KEY,
    AuthorID int,
    Content text,
    PostTime datetime,
    IsDeleted boolean,
    FOREIGN KEY (AuthorID) REFERENCES Users(UserID)
);

CREATE TABLE Reports (
    ReportID int PRIMARY KEY,
    CreatorID int,
    ReportedUserID int,
    ReportType varchar(255),
    Content text,
    CreationTime datetime,
    FOREIGN KEY (CreatorID) REFERENCES Users(UserID),
    FOREIGN KEY (ReportedUserID) REFERENCES Users(UserID)
);

CREATE TABLE Recommendations (
    RecommendationID int PRIMARY KEY,
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


