import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function WhiskyForm() {
  // Initialize formState with StartTime set to now
  const [formState, setFormState] = useState({
    StartPrice: "",
    BuyNowPrice: "",
    Description: "",
    StartTime: new Date().toISOString().slice(0, 16),
    EndTime: "2024-04-15T12:00:00Z",
    Category: "",
    Availability: true,
    Condition: "Unopened",
    TastingNotes: "",
    Region: "Islay",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formState };
    if (!dataToSend.StartTime.endsWith("Z")) {
      dataToSend.StartTime += ":00Z";
    }
    if (!dataToSend.EndTime.endsWith("Z")) {
      dataToSend.EndTime += ":00Z";
    }

    // console.log("Data preparation timestamp:", new Date().toISOString());
    // console.log("Data being sent:", JSON.stringify(dataToSend, null, 2));
    const accessToken = sessionStorage.getItem("accessToken");
    fetch("http://localhost:8000/whisky/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Whisky submitted successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        console.log("Operation completed timestamp:", new Date().toISOString());
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Submit Whisky
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* StartTime is now set by default to the current time */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="StartTime"
              type="datetime-local"
              name="StartTime"
              value={formState.StartTime}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>
          {/* EndTime allows user definition */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="EndTime"
              type="datetime-local"
              name="EndTime"
              value={formState.EndTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="BuyNowPrice"
              name="BuyNowPrice"
              value={formState.BuyNowPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="StartPrice"
              name="StartPrice"
              value={formState.StartPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="TastingNotes"
              name="TastingNotes"
              value={formState.TastingNotes}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="Description"
              value={formState.Description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="Category"
                value={formState.Category}
                onChange={handleChange}
              >
                <MenuItem value="Bourbon">Bourbon</MenuItem>
                <MenuItem value="Scotch">Scotch</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="Irish">Irish</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                label="Condition"
                name="Condition"
                value={formState.Condition}
                onChange={handleChange}
              >
                <MenuItem value="Unopened">Unopened</MenuItem>
                <MenuItem value="OpenedButSealed">Opened But Sealed</MenuItem>
                <MenuItem value="OpenedWithoutSeal">
                  Opened Without Seal
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Other fields remain unchanged */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#D8BFD8",
                color: "black",
                marginLeft: "10px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#bea8be",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default WhiskyForm;
