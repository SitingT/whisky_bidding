import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia, // Import CardMedia for images
} from "@mui/material";
import BourbonDrink from "../Components/Assets/product_1.png";

const ShopCategory = ({ category }) => {
  const [whiskies, setWhiskies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        <Card
          key={whisky.ItemID}
          sx={{
            minWidth: 275,
            maxWidth: 300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Placeholder for an image or actual image */}
          <CardMedia
            component="img"
            height="280"
            image={BourbonDrink} // Path to your image
            alt="Whisky image"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            {" "}
            {/* This ensures content takes up available space, pushing actions to the bottom */}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {whisky.Description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Category: {whisky.Category}
            </Typography>
            <Typography variant="body2">
              Start Price: ${whisky.StartPrice}
              <br />
              Buy Now Price: ${whisky.BuyNowPrice}
              Start Time: {new Date(whisky.StartTime).toLocaleString()}
              <br />
              End Time: {new Date(whisky.EndTime).toLocaleString()}
              <br />
              Tasting Notes: {whisky.TastingNotes}
              <br />
              Region: {whisky.Region}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShopCategory;
