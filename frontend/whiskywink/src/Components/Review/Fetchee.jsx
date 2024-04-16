import React, { useState, useEffect } from "react";
import ReviewDisplay from "./ReviewsDisplay";
const ReviewFetcher = () => {
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

  return <ReviewDisplay reviews={reviews} error={error} />;
};

export default ReviewFetcher;
