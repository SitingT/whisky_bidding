import React, { useState, useEffect } from "react";
import ReviewDisplay from "./ReviewsDisplay";
const ReviewerFetcher = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchReviews = async () => {
      const endpoint = "http://localhost:8000/api/reviews/auth-user/";
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

  const content =
    reviews.length > 0 ? (
      <ReviewDisplay reviews={reviews} CanBeDelete={true} />
    ) : (
      <p>No reviews yet.</p>
    );

  return content;
};

export default ReviewerFetcher;
