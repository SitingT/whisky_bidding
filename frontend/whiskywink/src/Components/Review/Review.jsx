import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const CreateReviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access location object
  const { ItemID, RevieweeID } = location.state || {
    ItemID: "",
    RevieweeID: "",
  }; // Destructure and provide defaults

  const [reviewData, setReviewData] = useState({
    RevieweeID: RevieweeID,
    ItemID: ItemID,
    Rating: "",
    Comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const accessToken = sessionStorage.getItem("accessToken");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/reviews/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        console.log("reviewData", reviewData);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        alert("Review submitted successfully!");
        navigate("/"); // Navigate back to home or another route
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit review.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: 2,
        }}
      >
        <TextField
          label="Rating"
          type="number"
          name="Rating"
          variant="outlined"
          value={reviewData.Rating}
          onChange={handleInputChange}
        />
        <TextField
          label="Comment"
          type="text"
          name="Comment"
          multiline
          rows={4}
          variant="outlined"
          value={reviewData.Comment}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#4CAF50",
            color: "white",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          Submit Review
        </Button>
      </Box>
    </form>
  );
};

export default CreateReviewForm;
