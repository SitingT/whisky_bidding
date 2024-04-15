import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
} from "@mui/material";
import profile_img from "../Assets/profile.png";

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
        const response = await fetch(`http://localhost:8000//user/details/`, {
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

  if (!accessToken) {
    return (
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Typography variant="h6" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardMedia
          component="img"
          height="300"
          image={profile_img}
          alt="Personal Image"
          sx={{
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
        <CardContent>
          {error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : user ? (
            <>
              <Typography variant="h5" component="div" align="center">
                {user.name}
              </Typography>
              <Typography color="text.secondary" align="center">
                Email: {user.email}
              </Typography>
              <Typography color="text.secondary" align="center">
                Staff: {user.is_staff ? "Yes" : "No"}
              </Typography>
              <Typography color="text.secondary" align="center">
                Registration Date:{" "}
                {new Date(user.registration_date).toLocaleDateString()}
              </Typography>
              {user.overall_rating !== null ? (
                <Typography color="text.secondary" align="center">
                  Overall Rating: {user.overall_rating}
                </Typography>
              ) : (
                <Typography color="text.secondary" align="center">
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
    </Container>
  );
}

export default UserDetails;
