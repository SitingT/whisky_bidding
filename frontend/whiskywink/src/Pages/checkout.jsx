import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

function CheckoutForm({ Price, ItemID }) {
  // State for storing input values
  const [formData, setFormData] = useState({
    itemName: "", // Assuming you want to allow editing the item name
    finalPrice: Price,
    paymentMethodName: "",
    paymentMethodType: "",
    paymentMethodDescription: "",
    paymentMethodStatus: true,
  });

  // Automatically set paymentMethodName based on paymentMethodType
  useEffect(() => {
    if (formData.paymentMethodType === "online") {
      setFormData((prevState) => ({ ...prevState, paymentMethodName: "Card" }));
    } else if (formData.paymentMethodType === "offline") {
      setFormData((prevState) => ({
        ...prevState,
        paymentMethodName: "Check",
      }));
    }
  }, [formData.paymentMethodType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the payload using the state
    const payload = {
      ItemID: ItemID,
      BuyerID: 2, // Assuming fixed for example
      SellerID: 3, // Assuming fixed for example
      FinalPrice: formData.finalPrice,
      TransactionStatus: "Initiated",
      PaymentStatus: "Pending",
      PaymentMethodID: {
        MethodName: formData.paymentMethodName,
        MethodType: formData.paymentMethodType,
        Description: formData.paymentMethodDescription,
        Status: formData.paymentMethodStatus,
      },
      UPSTrackingNumber: "1Z999AA10123456784",
      TransactionDate: new Date().toISOString(),
    };

    // Example API call placeholder
    console.log("Payload to submit:", payload);
    alert("Transaction simulated. Check console for payload.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h2>Checkout Form</h2>
      <TextField
        label="Item Name (for display only)"
        variant="outlined"
        name="itemName"
        value={formData.itemName}
        onChange={handleInputChange}
      />
      <TextField
        label="Final Price"
        variant="outlined"
        type="number"
        name="finalPrice"
        value={formData.finalPrice}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel>Payment Method Type</InputLabel>
        <Select
          value={formData.paymentMethodType}
          onChange={handleInputChange}
          name="paymentMethodType"
        >
          <MenuItem value="online">Online</MenuItem>
          <MenuItem value="offline">Offline</MenuItem>
        </Select>
        <FormHelperText>
          Select Online for card or Offline for check
        </FormHelperText>
      </FormControl>
      <TextField
        label="Payment Method Name"
        variant="outlined"
        name="paymentMethodName"
        value={formData.paymentMethodName}
        onChange={handleInputChange}
        disabled
      />
      <TextField
        label="Payment Method Description"
        variant="outlined"
        name="paymentMethodDescription"
        value={formData.paymentMethodDescription}
        onChange={handleInputChange}
      />
      <Button type="submit" variant="contained">
        Submit Transaction
      </Button>
    </form>
  );
}

export default CheckoutForm;
