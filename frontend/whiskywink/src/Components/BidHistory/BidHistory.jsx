import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Container,
  Box,
  Paper,
  Alert,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";
import moment from "moment";

// Dummy image paths, replace these with your actual import paths
import ScotchImage from "../Assets/product_1.png";
import BourbonImage from "../Assets/product_2.png";
import JapaneseImage from "../Assets/product_3.png";
import IrishImage from "../Assets/product_4.png";

const BidHistory = ({ customerID, status }) => {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:8000/customer/";
  const url = `${baseUrl}bids_status/${status ? `?status=${status}` : ""}`;

  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBids(data);
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        setError(error.toString());
      });
  }, [accessToken]);

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
  const navigate = useNavigate();

  const redirectToPayment = (bid) => {
    console.log("Navigating with bid:", bid);
    navigate(`/checkout/${bid.ItemID}/${bid.SellerID}/ ${bid.BidAmount}`);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 6 }}>
        {error && <Alert severity="error">Error fetching bids: {error}</Alert>}
        {bids.length > 0 ? (
          <Paper elevation={3}>
            <List>
              {bids.map((bid, index) => (
                <React.Fragment key={bid.BidID}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={bid.Category}
                        src={getCategoryImage(bid.Category)}
                        variant="square"
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Item ID: ${bid.ItemID}, Bid: $${bid.BidAmount},`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`Auction Status: ${bid.AuctionStatus}, Bid Status: ${bid.BidStatus}`}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`Bid Time: ${moment(bid.BidTime).format(
                              "LLLL"
                            )} End Time: ${moment(bid.EndTime).format("LLLL")}`}
                          </Typography>
                        </>
                      }
                    />
                    {bid.BidStatus === "Win" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => redirectToPayment(bid)}
                        sx={{
                          backgroundColor: "#D8BFD8",
                          color: "black",
                          marginLeft: "10px",
                          marginTop: "10px",
                          "&:hover": {
                            backgroundColor: "#bea8be",
                          },
                        }}
                      >
                        Proceed to Payment
                      </Button>
                    )}
                  </ListItem>
                  {index < bids.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography>No bids found for this status.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default BidHistory;
