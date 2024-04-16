import React, { useEffect, useState } from "react";

const OtherUserDetails = ({ accessToken, userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}/`, {
        // Using dynamic userId from props
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const data = await response.json();
      setUser(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]); // Run when accessToken or userId changes

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>User Details</h1>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Overall Rating:</strong> {user.overall_rating}
          </p>
          <p>
            <strong>Whisky Sold Count:</strong> {user.whisky_sold_count}
          </p>
          <h2>Reviews</h2>
          {user.reviews.length > 0 ? (
            <ul>
              {user.reviews.map((review, index) => (
                <li key={index}>
                  <p>
                    <strong>Rating:</strong> {review.Rating}
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.Comment}
                  </p>
                  <p>
                    <strong>Comment Time:</strong>{" "}
                    {new Date(review.CommentTime).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      ) : (
        <div>No user details available.</div>
      )}
    </div>
  );
};

export default OtherUserDetails;
