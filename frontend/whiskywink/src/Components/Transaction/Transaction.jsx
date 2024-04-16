import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScotchImage from "../Assets/product_1.png";
import BourbonImage from "../Assets/product_2.png";
import JapaneseImage from "../Assets/product_3.png";
import IrishImage from "../Assets/product_4.png";

const TransactionComponent = ({ role }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTransactions = async () => {
      const endpoint = `http://localhost:8000/user/transactions/${role}/`;
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
      } catch (error) {
        setError(error.toString());
      }
    };
    fetchTransactions();
  }, [role, accessToken]);

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
        return ""; // Consider adding a default image here
    }
  };

  const handleReviewClick = (transaction) => {
    navigate("/create-review", {
      state: {
        ItemID: transaction.item_details.ItemID,
        RevieweeID: transaction.SellerID,
      },
    });
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {error ? (
        <Typography color="error" sx={{ width: "100%", textAlign: "center" }}>
          Error fetching data: {error}
        </Typography>
      ) : (
        transactions.map((transaction) => (
          <Grid item xs={12} sm={6} md={4} key={transaction.TransactionID}>
            <Card sx={{ maxWidth: 345, marginLeft: "100px" }}>
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
                    {role === "buyer" && (
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#D8BFD8",
                          color: "black",
                          padding: "3px 6px",
                          fontSize: "0.875rem",
                          height: "32px",
                          width: "190px",
                          marginLeft: "80px",
                        }}
                        onClick={() => handleReviewClick(transaction)}
                        sx={{ mt: 2 }}
                      >
                        Write a Review
                      </Button>
                    )}
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
