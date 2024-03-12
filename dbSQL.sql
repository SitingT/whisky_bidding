-- 1. Calculate the total value of bids for each type of whisky
/* expected output


*/
SELECT
    wd.Category AS WhiskyType,
    SUM(b.BidAmount) AS TotalBidValue
FROM
    WhiskyDetails wd
JOIN
    Bids b ON wd.ItemID = b.ItemID
GROUP BY
    wd.Category;
/*
Calculate the average bid amount for each type of whisky sold by each seller
*/
SELECT
    u.Username AS Seller,
    wd.Category AS WhiskyType,
    AVG(b.BidAmount) AS AverageBidAmount
FROM
    Users u
JOIN
    WhiskyDetails wd ON u.UserID = wd.SellerID
JOIN
    Bids b ON wd.ItemID = b.ItemID
GROUP BY
    u.Username, wd.Category;
/*
List of all bidders who have bid on multiple whiskies, 
sorted by the number of distinct whiskies they have bid on in descending order.
*/
SELECT
    BidderID,
    COUNT(DISTINCT ItemID) AS NumWhiskiesBidOn
FROM
    Bids
GROUP BY
    BidderID
HAVING
    COUNT(DISTINCT ItemID) > 1
ORDER BY
    NumWhiskiesBidOn DESC;
/*
Retrieve the bidding history for Scotch whisky, where users can view the chronological history of bids.
*/
SELECT
    b.BidderID,
    COUNT(*) AS TotalBids,
    AVG(b.BidAmount) AS AverageBidAmount
FROM
    Bids b
WHERE
    b.ItemID = 1
GROUP BY
    b.BidderID
HAVING
    COUNT(*) > 1
ORDER BY
    MIN(b.BidTime);
/*
Find the highest bid for each whisky, 
using a subquery to determine the maximum bid amount for each whisky
*/
SELECT
    wd.ItemID,
    wd.Category AS WhiskyType,
    b.BidAmount AS HighestBidAmount
FROM
    WhiskyDetails wd
JOIN
    (
        SELECT
            ItemID,
            MAX(BidAmount) AS MaxBidAmount
        FROM
            Bids
        GROUP BY
            ItemID
    ) AS max_bids ON wd.ItemID = max_bids.ItemID
JOIN
    Bids b ON max_bids.ItemID = b.ItemID AND max_bids.MaxBidAmount = b.BidAmount;
