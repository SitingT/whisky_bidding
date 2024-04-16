import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

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
        setTransactions(data);
      } catch (error) {
        setError(error.toString());
      }
    };

    fetchTransactions();
  }, [accessToken]);

  return (
    <Grid container spacing={2}>
      {error ? (
        <Typography color="error">Error fetching data: {error}</Typography>
      ) : (
        transactions.map((transaction) => (
          <Grid item xs={12} sm={6} md={4} key={transaction.TransactionID}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Transaction #{transaction.TransactionID}
                </Typography>
                <Typography color="text.secondary">
                  Final Price: ${transaction.FinalPrice}
                </Typography>
                <Typography color="text.secondary">
                  Status: {transaction.TransactionStatus}
                </Typography>
                <Typography color="text.secondary">
                  Payment Status: {transaction.PaymentStatus}
                </Typography>
                {transaction.item_details && (
                  <>
                    <Typography variant="h6">Whisky Details</Typography>
                    <Typography>
                      {transaction.item_details.Description}
                    </Typography>
                    <Typography>
                      Category: {transaction.item_details.Category}
                    </Typography>
                    <Typography>
                      Auction Status: {transaction.item_details.AuctionStatus}
                    </Typography>
                    <Typography>
                      Highest Bid: ${transaction.item_details.HighestBid}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="140"
                      image={getCategoryImage(
                        transaction.item_details.Category
                      )}
                      alt="Whisky Category"
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default TransactionComponent;
