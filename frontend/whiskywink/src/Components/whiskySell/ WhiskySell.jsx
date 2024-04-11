import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import moment from "moment";

function WhiskySell() {
  const [whiskies, setWhiskies] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    fetch("http://localhost:8000/whisky/sell/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setWhiskies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // The empty array ensures this effect runs once after the initial render

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Whisky Listings
      </Typography>
      <List>
        {whiskies.map((whisky) => (
          <ListItem key={whisky.ItemID}>
            <ListItemText
              primary={`Item ID: ${whisky.ItemID}`}
              secondary={`Status: ${whisky.AuctionStatus}| Description: ${
                whisky.Description
              } | Highest Bid: ${whisky.HighestBid} |  End Time: ${moment(
                whisky.EndTime
              ).format("LLLL")}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default WhiskySell;
