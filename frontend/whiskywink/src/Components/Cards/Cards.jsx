import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  IconButton,
} from "@mui/material";
import ImageButtonAsset from "../Assets/cart_icon.png"; // Your cart icon
import DefaultImage from "../Assets/product_1.png"; // Default image if none is provided

const WhiskyCard = ({ whisky, image }) => (
  <Card
    sx={{
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
      image={image || DefaultImage}
      alt="Whisky"
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Start Price: ${whisky.StartPrice}
      </Typography>
      <Typography variant="body2">
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
          backgroundColor: "#D8BFD8",
          color: "black",
          padding: "3px 6px", // Smaller padding
          fontSize: "0.875rem", // Smaller font size
          height: "32px",

          //   left: "20px",
        }}
      >
        Buy Now: ${whisky.BuyNowPrice}
      </Button>

      <Button
        variant="contained"
        style={{
          backgroundColor: "#D8BFD8",
          color: "black",
          padding: "3px 6px", // Smaller padding
          fontSize: "0.875rem", // Smaller font size
          height: "32px",
          left: "5px",
        }}
      >
        Bid Now: ${whisky.StartPrice}
      </Button>

      <div style={{ position: "absolute", right: "5px" }}>
        <IconButton aria-label="view image">
          <img src={ImageButtonAsset} alt="View" />
        </IconButton>
      </div>
    </CardActions>
  </Card>
);

export default WhiskyCard;
