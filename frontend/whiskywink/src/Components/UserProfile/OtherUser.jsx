import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

const OtherUserDetails = ({ accessToken, userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}/`, {
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
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Card raised>
      <CardContent>
        {user ? (
          <>
            <Typography variant="h5" component="div">
              User Details
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Overall Rating:</strong> {user.overall_rating}
            </Typography>
            <Typography variant="body1">
              <strong>Whisky Sold Count:</strong> {user.whisky_sold_count}
            </Typography>

            <Typography variant="h6" component="div">
              Reviews
            </Typography>
            <List>
              {user.reviews.length > 0 ? (
                user.reviews.map((review, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={`Rating: ${review.Rating}`}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                            >{`Comment: ${review.Comment}`}</Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              {`Comment Time: ${new Date(
                                review.CommentTime
                              ).toLocaleString()}`}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < user.reviews.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No reviews available." />
                </ListItem>
              )}
            </List>
          </>
        ) : (
          <Typography>No user details available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OtherUserDetails;
