-- 1. Calculate the total value of bids for each type of whisky
/* expected output:
# WhiskyType, TotalBidValue
'Single Malt', '355.00'
'Blended Malt', '540.00'
'Grain Whisky', '55.00'
'Single Pot Still', '550.00'
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
    
    
    
-- 2. Calculate the average bid amount for each type of whisky sold by each seller
/* expected output:
# Seller, WhiskyType, AverageBidAmount
'AliceSmith', 'Single Malt', '118.333333'
'BobJones', 'Blended Malt', '180.000000'
'CathyLee', 'Grain Whisky', '55.000000'
'DavidKim', 'Single Pot Still', '550.000000'
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
    
    
    
-- 3.  List of all bidders who have bid on multiple whiskies,
-- sorted by the number of distinct whiskies they have bid on in descending order.   
/* expected output:
# BidderID, NumWhiskiesBidOn
'1', '2'
'4', '2'
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
    
    
    
-- 4. Retrieve the bidding history for Scotch whisky, 
-- where users can view the chronological history of bids.
/* expected output:
# BidderID, TotalBids, AverageBidAmount
'2', '2', '112.500000'
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
    
    
    
-- 5. Find the highest bid for each whisky, using a subquery to determine the maximum bid amount for each whisky.
/* expected output:
# ItemID, WhiskyType, HighestBidAmount
'2', 'Blended Malt', '210.00'
'3', 'Grain Whisky', '55.00'
'4', 'Single Pot Still', '550.00'
'1', 'Single Malt', '130.00'
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