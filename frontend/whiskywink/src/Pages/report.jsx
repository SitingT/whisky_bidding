import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

const WhiskyReport = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch("http://localhost:8000/whisky/report/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 403) {
          setError("Sorry, the report can only be viewed by the admin.");
          return;
        }

        if (!response.ok) {
          setError("Failed to fetch the whisky report.");
          console.error("Failed to fetch the whisky report.");
          return;
        }

        const data = await response.json();
        setReport(data);
      } catch (error) {
        setError("Failed to fetch the whisky report.");
        console.error("Failed to fetch the whisky report:", error);
      }
    };

    fetchReport();
  }, [accessToken]);

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container>
        <Typography variant="h5" component="h2">
          Loading report...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Whisky Report
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Whisky Counts
          </Typography>
          <List>
            {report.whisky_counts.map((count, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Status: ${count.AuctionStatus}, Total: ${count.total}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Inactive Users
          </Typography>
          <List>
            {report.users_never_bidded.map((user, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`User ID: ${user.id}, Name: ${user.name}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Most Popular Whisky
          </Typography>
          <Typography>
            {typeof report.most_popular_whisky === "string"
              ? report.most_popular_whisky
              : `Item ID: ${report.most_popular_whisky.ItemID}, Description: ${report.most_popular_whisky.Description}, Total Bids: ${report.most_popular_whisky.TotalBids}`}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Most Active User
          </Typography>
          <Typography>
            {typeof report.most_active_user === "string"
              ? report.most_active_user
              : `User ID: ${report.most_active_user.UserID}, Username: ${report.most_active_user.Username}, Total Bids: ${report.most_active_user.TotalBids}`}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WhiskyReport;
