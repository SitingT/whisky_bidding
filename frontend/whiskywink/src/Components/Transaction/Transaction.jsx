import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

// Images for different whisky categories
import ScotchImage from "../Assets/product_1.png";
import BourbonImage from "../Assets/product_2.png";
import JapaneseImage from "../Assets/product_3.png";
import IrishImage from "../Assets/product_4.png";

const TransactionComponent = ({ role }) => {
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
      const endpoint = `http://localhost:8000/user/transactions/${role}/`; // Modify endpoint based on role
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data);
        console.log("transaction", data);
      } catch (error) {
        setError(error.toString());
      }
    };

    fetchTransactions();
  }, [role, accessToken]); // Reacting to role change

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <Typography color="error">Error fetching data: {error}</Typography>
      ) : (
        transactions.map((transaction) => (
          <Grid item xs={12} sm={6} md={4} key={transaction.TransactionID}>
            <Card
              sx={{
                width: 370,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <Typography variant="h5">
                  Final Price: ${transaction.FinalPrice}
                </Typography>
                <Typography>
                  Payment Status: {transaction.PaymentStatus}
                </Typography>
                {transaction.item_details && (
                  <>
                    <Typography variant="h5">Whisky Details</Typography>
                    <Typography>
                      Description: {transaction.item_details.Description}
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
                      sx={{
                        width: "auto",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
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
