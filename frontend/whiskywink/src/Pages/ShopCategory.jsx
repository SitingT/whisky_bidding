import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const ShopCategory = ({ category }) => {
  const [whiskies, setWhiskies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://127.0.0.1:8000/whisky/active/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWhiskies(data);
        console.log("Data fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.toString());
      });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      {whiskies.map((whisky) => (
        <Card key={whisky.ItemID} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {whisky.Description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Category: {whisky.Category}
            </Typography>
            <Typography variant="body2">
              Start Price: ${whisky.StartPrice}
              <br />
              Buy Now Price: ${whisky.BuyNowPrice}
              <br />
              Auction Status: {whisky.AuctionStatus}
              <br />
              Start Time: {new Date(whisky.StartTime).toLocaleString()}
              <br />
              End Time: {new Date(whisky.EndTime).toLocaleString()}
              <br />
              Tasting Notes: {whisky.TastingNotes}
              <br />
              Region: {whisky.Region}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ShopCategory;
