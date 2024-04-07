import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const CreateBidForm = ({ itemID, closeDialog }) => {
  const [bidData, setBidData] = useState({
    BidderID: "1",
    ItemID: itemID, // Using prop value or empty string if not provided
    BidAmount: "1000",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBidData({ ...bidData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/bid/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bidData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Bid submitted successfully!");
        closeDialog(); // Close the dialog on successful submission
        window.location.reload(); // Refresh the page to re-fetch data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2, // Adjusts the space between items
        }}
      >
        <TextField
          label="Bid Amount"
          type="number"
          name="BidAmount"
          variant="outlined"
          value={bidData.BidAmount}
          onChange={handleInputChange}
          sx={{ width: "auto", flexGrow: 1 }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#D8BFD8",
            color: "black",
            "&:hover": {
              backgroundColor: "#bea8be",
            },
          }}
        >
          Submit Bid
        </Button>
      </Box>
    </form>
  );
};

export default CreateBidForm;
