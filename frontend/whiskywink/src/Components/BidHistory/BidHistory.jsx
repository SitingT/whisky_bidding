import React, { useState, useEffect } from "react";
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
} from "@mui/material";

// Dummy image paths, replace these with your actual import paths
import ScotchImage from "../Assets/product_1.png";
import BourbonImage from "../Assets/product_2.png";
import JapaneseImage from "../Assets/product_3.png";
import IrishImage from "../Assets/product_4.png";

const BidHistory = ({ customerID, status }) => {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:8000/customer/";
  const url = `${baseUrl}${customerID}/bids_status/${
    status ? `?status=${status}` : ""
  }`;

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
      })
      .catch((error) => {
        setError(error.toString());
      });
  }, [customerID, status]);

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
                      primary={`Item ID: ${bid.ItemID}, Bid: $${bid.BidAmount}`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`Auction Status: ${bid.AuctionStatus}, Bid Status: ${bid.BidStatus}`}
                          </Typography>
                          —{" "}
                          {`Bid Time: ${bid.BidTime}, Category: ${bid.Category}, End Time: ${bid.EndTime}`}
                        </>
                      }
                    />
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
