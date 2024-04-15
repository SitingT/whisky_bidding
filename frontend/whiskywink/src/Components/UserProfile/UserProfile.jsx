import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
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

  return (
    <Card
      sx={{
        maxWidth: 345,
        marginTop: 4,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardContent>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : user ? (
          <>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography color="text.secondary">Email: {user.email}</Typography>
            <Typography color="text.secondary">
              Staff: {user.is_staff ? "Yes" : "No"}
            </Typography>
            <Typography color="text.secondary">
              Registration Date:{" "}
              {new Date(user.registration_date).toLocaleDateString()}
            </Typography>
            <Typography color="text.secondary">Overall Rating</Typography>
            {/* {user.overall_rating && (
              <Typography color="text.secondary">
                Overall Rating
              </Typography>
            )} */}
          </>
        ) : (
          <Typography component="div">Loading...</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default UserDetails;
