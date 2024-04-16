import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
  Box,
} from "@mui/material";
import profile_img from "../Assets/profile.png";
import ReviewDisplay from "../Review/ReviewsDisplay";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) {
      setError("Please log in to see the profile.");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/details/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch user details.");
          console.error("Failed to fetch user details.");
          return;
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        setError("Failed to fetch user details.");
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [accessToken]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ width: "100vh" }}>
          <CardMedia
            component="img"
            height="300"
            image={profile_img}
            alt="Personal Image"
            sx={{
              //   width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              margin: "auto",
            }}
          />
          <CardContent>
            {error ? (
              <Typography color="error" align="center">
                {error}
              </Typography>
            ) : user ? (
              <>
                <Typography variant="h4" component="div" align="center">
                  Name : {user.name}
                </Typography>
                <Typography variant="h5" align="center">
                  Email: {user.email}
                </Typography>
                <Typography variant="h5" align="center">
                  Staff: {user.is_staff ? "Yes" : "No"}
                </Typography>
                <Typography variant="h5" align="center">
                  Registration Date:{" "}
                  {new Date(user.registration_date).toLocaleDateString()}
                </Typography>
                {user.overall_rating !== null ? (
                  <Typography variant="h5" align="center">
                    Overall Rating: {user.overall_rating}
                  </Typography>
                ) : (
                  <Typography variant="h5" align="center">
                    No one gives you a rating yet.
                  </Typography>
                )}
              </>
            ) : (
              <Typography component="div" align="center">
                Loading...
              </Typography>
            )}
          </CardContent>
        </Card>
        <h2> My Reviews</h2>
        <ReviewDisplay />
      </Container>
    </Box>
  );
}

export default UserDetails;
