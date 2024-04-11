import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";

import DefaultImage from "../Assets/product_1.png"; // Default image if none is provided
import CreateBidForm from "../CreateBidForm /CreateBidForm";
const WhiskyCard = ({ whisky, image }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
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
          Item Number: {whisky.ItemID}
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
            padding: "3px 6px",
            fontSize: "0.875rem",
            height: "32px",
            width: "190px",
            marginLeft: "80px",
          }}
          onClick={handleClickOpen} // Opens the Dialog on click
        >
          Bid Now: ${whisky.Current_bid}
        </Button>
      </CardActions>

      {/* Dialog component for bidding */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bid on Whisky</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To bid on this whisky, please enter your bid amount here. We will
            send updates occasionally regarding your bid status.
          </DialogContentText>
          <Box sx={{ my: 3 }}></Box>
          <CreateBidForm itemID={whisky.ItemID} closeDialog={closeDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default WhiskyCard;
