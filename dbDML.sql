INSERT INTO Users (Username, Email, Password, UserType, RegistrationDate, LastLoginDate, IsBlocked, OverallRating) VALUES 
('AliceSmith', 'alice.smith@gmail.com', 'alice123', 'Normal', '2024-01-10 09:00:00', '2024-01-15 12:00:00', false, 4.2),
('BobJones', 'bob.jones@foxmail.com', 'bobjonespassword', 'Admin', '2024-02-05 08:30:00', '2024-02-10 11:45:00', false, 4.7),
('CathyLee', 'cathy.lee@qq.com', 'cathypass', 'Normal', '2024-03-15 10:00:00', '2024-03-20 09:30:00', true, 3.8),
('DavidKim', 'david.kim@outlook.com', 'davidsecure', 'Normal', '2024-04-25 14:00:00', '2024-04-30 16:00:00', false, 4.5),
('PeterWu', 'peterwu@icloud.com', 'password123', 'Normal', '2024-03-10 14:00:00', '2024-03-10 14:30:00', FALSE, 4.5),
('OliverChiu', 'oliverchiu@163.com', 'securepass', 'Admin', '2024-03-09 10:00:00', '2024-03-10 09:30:00', FALSE, 4.7),
('MikeSmith', 'mikesmith@yahoo.com', 'mikepassword', 'Normal', '2024-03-08 16:00:00', '2024-03-09 17:00:00', TRUE, 3.8),
('HannahJones', 'hannahjones@gmail.com', 'hannah1234', 'Normal', '2024-03-07 12:00:00', '2024-03-08 13:00:00', FALSE, 4.2);

INSERT INTO PaymentMethods (MethodID, MethodName, MethodType, Description, Status) VALUES 
(1, 'PayPal', 'Online', 'Online payment system', true),
(2, 'Bank Transfer', 'Offline', 'Transfer money through bank', true),
(3, 'Credit Card', 'Online', 'Pay with credit card online', true),
(4, 'Cash on Delivery', 'Offline', 'Pay with cash upon receiving goods', false),
(1, 'Credit Card', 'Online', 'Payment via credit card', TRUE),
(2, 'PayPal', 'Online', 'Payment via PayPal account', TRUE),
(3, 'Bank Transfer', 'Offline', 'Payment via direct bank transfer', TRUE),
(4, 'Cash on Delivery', 'Offline', 'Payment in cash upon delivery', FALSE);

INSERT INTO WhiskyDetails (SellerID, StartPrice, BuyNowPrice, Description, AuctionStatus, StartTime, EndTime, Category, Availability, `Condition`, TastingNotes, Region) VALUES 
(1, 100.00, 150.00, 'Rare single malt whisky', 'Active', '2023-03-01 00:00:00', '2023-03-10 00:00:00', 'Single Malt', true, 'Unopened', 'Smooth with a hint of smoke', 'Speyside'),
(2, 200.00, 300.00, 'Aged 18 years', 'Inactive', '2023-02-01 00:00:00', '2023-02-10 00:00:00', 'Blended Malt', false, 'OpenedButSealed', 'Rich and complex', 'Highland'),
(3, 50.00, 75.00, 'Budget-friendly choice', 'Canceled', '2023-01-01 00:00:00', '2023-01-10 00:00:00', 'Grain Whisky', true, 'OpenedWithoutSeal', 'Light and floral', 'Lowland'),
(4, 500.00, 1000.00, 'Collector\'s edition', 'Active', '2023-04-01 00:00:00', '2023-04-10 00:00:00', 'Single Pot Still', true, 'Unopened', 'Exceptionally smooth with a hint of vanilla', 'Islay'),
(1, 100.00, 200.00, 'Rare single malt Scotch whisky', 'Active', '2024-03-10 10:00:00', '2024-03-17 10:00:00', 'Scotch Whisky', TRUE, 'Unopened', 'Smooth with a hint of peat', 'Speyside'),
(2, 150.00, 300.00, 'Aged bourbon whiskey', 'Active', '2024-03-11 12:00:00', '2024-03-18 12:00:00', 'Bourbon Whiskey', TRUE, 'OpenedButSealed', 'Rich and full-bodied', 'Kentucky'),
(3, 80.00, 160.00, 'Japanese whisky with unique flavor', 'Inactive', '2024-03-09 09:00:00', '2024-03-16 09:00:00', 'Japanese Whisky', FALSE, 'OpenedWithoutSeal', 'Fruity with a smooth finish', 'Hokkaido'),
(4, 200.00, 400.00, 'Exclusive Irish whiskey', 'Canceled', '2024-03-08 15:00:00', '2024-03-15 15:00:00', 'Irish Whiskey', TRUE, 'Unopened', 'Light and floral', 'Cork');

INSERT INTO Bids (BidID, ItemID, BidderID, BidAmount, BidTime) VALUES 
(1, 1, 2, 105.00, '2023-03-02 12:00:00'),
(2, 2, 3, 210.00, '2023-02-02 15:30:00'),
(3, 3, 4, 55.00, '2023-01-03 18:45:00'),
(4, 4, 1, 550.00, '2023-04-02 20:00:00'),
(1, 1, 2, 120.00, '2024-03-10 11:00:00'),
(2, 2, 3, 160.00, '2024-03-11 13:00:00'),
(3, 1, 4, 130.00, '2024-03-10 12:00:00'),
(4, 2, 1, 170.00, '2024-03-11 14:00:00');

INSERT INTO Transactions (TransactionID, ItemID, BuyerID, SellerID, FinalPrice, TransactionStatus, PaymentStatus, PaymentMethodID, UPSTrackingNumber, TransactionDate) VALUES 
(1, 1, 3, 1, 150.00, 'Completed', 'Completed', 1, '1Z999AA10123456784', '2023-03-10 12:00:00'),
(2, 2, 4, 2, 300.00, 'Cancelled', 'Failed', 2, '1Z999AA10123456785', '2023-02-10 15:00:00'),
(3, 3, 1, 3, 75.00, 'Initiated', 'Pending', 3, '1Z999AA10123456786', '2023-01-10 18:00:00'),
(4, 4, 2, 4, 1000.00, 'Completed', 'Completed', 4, '1Z999AA10123456787', '2023-04-10 20:00:00'),
(1, 1, 2, 1, 220.00, 'Completed', 'Completed', 1, '1Z12345E0291980793', '2024-03-17 11:00:00'),
(2, 2, 3, 2, 320.00, 'Completed', 'Completed', 2, '1Z12345E0291980794', '2024-03-18 13:00:00'),
(3, 3, 4, 3, 170.00, 'Cancelled', 'Failed', 3, '1Z12345E0291980795', '2024-03-16 10:00:00'),
(4, 4, 5, 4, 420.00, 'Initiated', 'Pending', 4, '1Z12345E0291980796', '2024-03-15 16:00:00');

INSERT INTO Reviews (ReviewID, ReviewerID, RevieweeID, ItemID, Rating, Comment, CommentTime, IsDeleted) VALUES 
(1, 1, 2, 1, 4.5, 'Great quality and packaging.', '2023-03-03 12:00:00', false),
(2, 3, 1, 2, 4.0, 'Item as described, smooth transaction.', '2023-03-04 14:30:00', false),
(3, 2, 3, 3, 3.5, 'Good product, but delayed shipping.', '2023-03-05 16:45:00', false),
(4, 4, 2, 4, 5.0, 'Excellent item, highly recommend!', '2023-03-06 18:00:00', false),
(1, 2, 1, 1, 4.5, 'Great whisky, smooth and rich flavor.', '2024-03-17 12:00:00', FALSE),
(2, 3, 2, 2, 4.7, 'Excellent bourbon, exceeded my expectations.', '2024-03-18 14:00:00', FALSE),
(3, 4, 3, 3, 3.8, 'Good whisky, but not as exceptional as advertised.', '2024-03-16 11:00:00', FALSE),
(4, 5, 4, 4, 4.2, 'Very nice Irish whiskey, smooth with a light finish.', '2024-03-15 17:00:00', FALSE);

INSERT INTO Messages (MessageID, SenderID, ReceiverID, Content, SendTime, IsSensitive, RelatedItemID) VALUES 
(1, 2, 3, 'Is the item still available?', '2023-03-03 10:00:00', false, 1),
(2, 4, 1, 'Can we discuss the final price?', '2023-03-04 11:30:00', false, 2),
(3, 4, 3, 'Could you please specify the shipping method for this whisky?', '2023-03-07 09:30:00', false, 2),
(4, 1, 4, 'When can I expect delivery?', '2023-03-06 16:20:00', false, 4),
(1, 1, 2, 'Hey, are you interested in the Scotch whisky I listed?', '2024-03-10 14:00:00', FALSE, 1),
(2, 2, 3, 'Can you provide more details about the bourbon whiskey?', '2024-03-11 15:30:00', FALSE, 2),
(3, 3, 1, 'I have a question about the Japanese whisky auction.', '2024-03-12 16:45:00', FALSE, 3),
(4, 4, 2, 'Is the Irish whiskey still available for purchase?', '2024-03-13 17:30:00', FALSE, 4);

INSERT INTO ForumPosts (PostID, AuthorID, Content, PostTime, IsDeleted) VALUES 
(1, 1, 'What is everyone''s favorite whisky for a special occasion?', '2023-03-08 12:00:00', false),
(2, 2, 'Has anyone tried pairing whisky with non-traditional foods? Curious about your experiments!', '2023-03-09 15:30:00', false),
(3, 3, 'I am new to whisky collecting. Can anyone recommend resources for beginners?', '2023-03-10 09:45:00', false),
(4, 4, 'Upcoming whisky tasting events? Let''s share and possibly meet up!', '2023-03-11 18:20:00', false),
(1, 1, 'What is your favorite whisky and why?', '2024-03-10 14:00:00', FALSE),
(2, 2, 'Has anyone tried Japanese whisky? Thoughts?', '2024-03-11 15:30:00', FALSE),
(3, 3, 'Best whisky for a beginner?', '2024-03-12 16:45:00', FALSE),
(4, 4, 'How do you properly store whisky?', '2024-03-13 17:30:00', FALSE);

INSERT INTO Reports (ReportID, CreatorID, ReportedUserID, ReportType, Content, CreationTime) VALUES 
(1, 2, 3, 'Spam', 'User is posting spam content in multiple threads.', '2023-03-12 10:00:00'),
(2, 4, 1, 'Inappropriate Language', 'User used offensive language in a forum post.', '2023-03-13 11:30:00'),
(3, 3, 2, 'Harassment', 'User sent unsolicited and harassing messages.', '2023-03-14 09:30:00'),
(4, 1, 4, 'Fake Listing', 'User posted a fraudulent whisky listing.', '2023-03-15 16:20:00'),
(1, 2, 3, 'Spam', 'User is sending unsolicited messages.', '2024-03-10 14:00:00'),
(2, 4, 1, 'Harassment', 'User is making inappropriate comments.', '2024-03-11 15:30:00'),
(3, 3, 2, 'Fraud', 'User is posting misleading information about a product.', '2024-03-12 16:45:00'),
(4, 1, 4, 'Inappropriate Content', 'User is sharing offensive content in their posts.', '2024-03-13 17:30:00');

INSERT INTO Recommendations (RecommendationID, UserID, RecommendedItemID, CreatedDateTime) VALUES 
(1, 2, 3, '2023-03-15 09:00:00'),
(2, 1, 4, '2023-03-16 10:30:00'),
(3, 3, 1, '2023-03-17 14:45:00'),
(4, 4, 2, '2023-03-18 16:20:00'),
(1, 1, 2, '2024-03-10 14:00:00'),
(2, 2, 3, '2024-03-11 15:30:00'),
(3, 3, 4, '2024-03-12 16:45:00'),
(4, 4, 1, '2024-03-13 17:30:00');

INSERT INTO OfflinePayments (OfflinePaymentID, TransactionID, MethodID, Details, ReceivedDate) VALUES 
(1, 1, 2, 'Bank wire transfer confirmation #12345', '2023-03-20 12:00:00'),
(2, 2, 2, 'Bank wire transfer confirmation #23456', '2023-03-21 15:30:00'),
(3, 3, 4, 'Cash payment received in person', '2023-03-22 09:45:00'),
(4, 4, 4, 'Check payment #78910 received', '2023-03-23 16:20:00'),
(1, 1, 3, 'Bank transfer confirmation number: 123456789', '2024-03-17 12:00:00'),
(2, 2, 3, 'Bank transfer confirmation number: 987654321', '2024-03-18 14:00:00'),
(3, 3, 4, 'Cash payment received by seller', '2024-03-16 11:00:00'),
(4, 4, 4, 'Cash payment received by seller', '2024-03-15 17:00:00');





