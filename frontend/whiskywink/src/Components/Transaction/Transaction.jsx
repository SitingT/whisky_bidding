import React, { useState, useEffect } from "react";

// Images for different whisky categories
import ScotchImage from "../Assets/product_1.png";
import BourbonImage from "../Assets/product_2.png";
import JapaneseImage from "../Assets/product_3.png";
import IrishImage from "../Assets/product_4.png";

const TransactionComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const getCategoryImage = (category) => {
    switch (category) {
      case "Scotch":
        return ScotchImage;
      case "Bourbon":
        return BourbonImage;
      case "Japanese":
        return JapaneseImage;
      case "Irish":
        return IrishImage;
      default:
        return ""; // Default image or leave as blank
    }
  };

  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/user/user_transactions/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("trans", data);
        setTransactions(data);
      } catch (error) {
        setError(error.toString());
      }
    };

    fetchTransactions();
  }, [accessToken]);

  return (
    <div>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <div>
          {transactions.map((transaction) => (
            <div key={transaction.TransactionID} className="transaction">
              <h3>Transaction #{transaction.TransactionID}</h3>
              <p>Final Price: ${transaction.FinalPrice}</p>
              <p>Status: {transaction.TransactionStatus}</p>
              <p>Payment Status: {transaction.PaymentStatus}</p>
              {transaction.item_details && (
                <div>
                  <h4>Whisky Details</h4>
                  <p>{transaction.item_details.Description}</p>
                  <p>Category: {transaction.item_details.Category}</p>
                  <p>
                    Auction Status: {transaction.item_details.AuctionStatus}
                  </p>
                  <p>Highest Bid: ${transaction.item_details.HighestBid}</p>
                  <img
                    src={getCategoryImage(transaction.item_details.Category)}
                    alt="Whisky Category"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionComponent;
