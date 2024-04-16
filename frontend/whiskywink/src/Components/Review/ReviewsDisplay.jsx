import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReviewDisplay = ({ reviews, error, CanBeDelete }) => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const handleDelete = (reviewId) => {
    fetch(`http://localhost:8000/api/reviews/delete/${reviewId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Review deleted successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error deleting the review.");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <Typography variant="body1" color="error">
          Error fetching reviews: {error}
        </Typography>
      ) : (
        reviews.map((review, index) => (
          <Card key={index} sx={{ width: "100vh", margin: "auto" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {review.ReviewerName
                  ? `User: ${review.ReviewerName}`
                  : `Item ID: ${review.ItemID}`}
                {review.RevieweeName
                  ? `, Send Review to : ${review.RevieweeName}`
                  : ""}
              </Typography>
              <Typography variant="body1">Rating: {review.Rating}</Typography>
              <Typography variant="body1">Comment: {review.Comment}</Typography>
              {CanBeDelete && (
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete(review.ReviewID)}
                  sx={{
                    backgroundColor: "#D8BFD8",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#bea8be",
                    },
                  }}
                >
                  Delete
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ReviewDisplay;
