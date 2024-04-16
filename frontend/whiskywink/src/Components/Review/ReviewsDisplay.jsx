import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ReviewDisplay = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const fetchReviews = async () => {
      const endpoint = "http://localhost:8000/api/reviews/reviewee/";
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.toString());
      }
    };

    fetchReviews();
  }, [accessToken]);

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
                User: {review.ReviewerName}
              </Typography>
              <Typography variant="body1">Rating: {review.Rating}</Typography>
              <Typography variant="body1">Comment: {review.Comment}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ReviewDisplay;
