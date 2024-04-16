import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ReviewDisplay = ({ reviews, error }) => {
  console.log("Reviews:", reviews);
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
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ReviewDisplay;
