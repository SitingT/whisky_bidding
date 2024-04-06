import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  IconButton, // Import IconButton
} from "@mui/material";
import BourbonDrink from "../Components/Assets/product_1.png";
// Import your image button asset
import ImageButtonAsset from "../Components/Assets/cart_icon.png";

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
        minWidth: "100vh",
      }}
    >
      {whiskies.map((whisky) => (
        <Card
          key={whisky.ItemID}
          sx={{
            // minWidth: 275,
            width: 370,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height="160"
            sx={{
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            image={BourbonDrink}
            alt="Whisky image"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Start Price: ${whisky.StartPrice}
            </Typography>
            <Typography variant="body2">
              <br />
              Category: {whisky.Category}
              <br />
              Start Time: {new Date(whisky.StartTime).toLocaleString()}
              <br />
              End Time: {new Date(whisky.EndTime).toLocaleString()}
              <br />
              Tasting Notes: {whisky.TastingNotes}
              <br />
              Region: {whisky.Region}
              <br />
              Description: {whisky.Description}
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            style={{ position: "relative", height: "100%" }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#E6E6FA",
                color: "black",
                left: "20px",
              }}
            >
              Buy Now: ${whisky.BuyNowPrice}
            </Button>

            {/* Wrapper div for positioning the IconButton */}
            <div style={{ position: "absolute", right: "30px" }}>
              <IconButton aria-label="view image">
                <img src={ImageButtonAsset} alt="View" />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ShopCategory;
