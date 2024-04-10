DELIMITER $$

-- Drop triggers
DROP TRIGGER IF EXISTS UpdateAuctionStatusAfterTransaction$$
DROP TRIGGER IF EXISTS UpdateUserOverallRatingAfterReviewUpdate$$

-- Drop procedures
DROP PROCEDURE IF EXISTS BlockUser$$

-- Reset the delimiter back to semicolon if you changed it
DELIMITER ;

-- Drop views
DROP VIEW IF EXISTS UserOverview;

-- Drop tables. It's crucial to start with tables that have foreign keys pointing to them
DROP TABLE IF EXISTS OfflinePayments;
DROP TABLE IF EXISTS Recommendations;
DROP TABLE IF EXISTS Reports;
DROP TABLE IF EXISTS ForumPosts;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Bids;
DROP TABLE IF EXISTS WhiskyDetails;
DROP TABLE IF EXISTS PaymentMethods;
DROP TABLE IF EXISTS Users;
