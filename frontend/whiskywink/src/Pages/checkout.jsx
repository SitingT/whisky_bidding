import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function TransactionForm() {
  const { ItemID, SellerID, Price } = useParams();
  const [formData, setFormData] = useState({
    methodName: "",
    methodType: "",
    description: "",
    status: true,
    trackingNumber: "",
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      methodName:
        name === "methodType"
          ? value === "Online"
            ? "card"
            : "check"
          : prev.methodName,
    }));
    if (name === "methodType" && value === "Online") {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateTrackingNumber = () => {
    // Generating a pseudo UPS tracking number format: "1Z999AA10123456784"
    return `1Z${Math.random()
      .toString(36)
      .toUpperCase()
      .substring(2, 6)}${Math.random().toString(10).substring(2, 6)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update form data with generated tracking number
    const trackingNumber = generateTrackingNumber();
    setFormData((prev) => ({
      ...prev,
      trackingNumber: trackingNumber,
    }));

    const payload = {
      ItemID: ItemID,
      SellerID: SellerID,
      FinalPrice: Price,
      TransactionStatus: "Initiated",
      PaymentStatus: "Completed",
      PaymentMethodID: {
        MethodName: formData.methodName,
        MethodType: formData.methodType,
        Description: formData.description,
        Status: formData.status,
      },
      UPSTrackingNumber: trackingNumber,
    };

    const accessToken = sessionStorage.getItem("accessToken");
    const response = await fetch(
      "http://localhost:8000/whisky/transaction/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      alert(
        `Transaction successful! Here is your shipping number: ${trackingNumber}`
      );
      navigate("/");
    } else {
      const responseData = await response.json();
      alert(`Failed to create transaction: ${JSON.stringify(responseData)}`);
    }

    // Optionally clear the tracking number or other form fields here if needed
    handleClose(); // Close modal after submission attempt
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Method Type</InputLabel>
        <Select
          label="Method Type"
          name="methodType"
          value={formData.methodType}
          onChange={handleInputChange}
        >
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Method Name"
        name="methodName"
        value={formData.methodName}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      {/* Hide tracking number from user view */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#D8BFD8",
          color: "black",
          marginLeft: "10px",
          marginTop: "10px",
          "&:hover": {
            backgroundColor: "#bea8be",
          },
        }}
      >
        Submit Transaction
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="cardName"
            label="Card Holder's Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            name="cardExpiration"
            label="Expiration Date"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            name="cardPhone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            name="cardAddress"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#D8BFD8",
              color: "black",
              marginLeft: "10px",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "#bea8be",
              },
            }}
          >
            Submitted
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default TransactionForm;
