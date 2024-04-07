import React, { useState, useEffect } from "react";

const BidHistory = ({ customerID, status }) => {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:8000/customer/";
  const url = `${baseUrl}${customerID}/bids_status/${
    status ? `?status=${status}` : ""
  }`;
  console.log(url);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBids(data);
        console.log("Bids fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
        setError(error.toString());
      });
  }, [customerID, status]); // Dependency array includes both customerID and status to refetch when either changes

  if (error) {
    return <p>Error fetching bids: {error}</p>;
  }

  return (
    <div>
      <h2>Bid Status for Customer {customerID}</h2>
      {bids.length > 0 ? (
        <ul>
          {bids.map((bid) => (
            <li key={bid.BidID}>
              <p>Item ID: {bid.ItemID}</p>
              <p>Bid Amount: {bid.BidAmount}</p>
              <p>Bid Time: {bid.BidTime}</p>
              <p>Auction Status: {bid.AuctionStatus}</p>
              <p>Bid Status: {bid.BidStatus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids found for this status.</p>
      )}
    </div>
  );
};

export default BidHistory;
