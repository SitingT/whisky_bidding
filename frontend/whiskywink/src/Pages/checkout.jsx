import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function TransactionForm() {
  const { ItemID, SellerID, Price } = useParams(); // Retrieving values from URL
  console.log(ItemID, SellerID, Price);
  // Initial state setup using useParams values
  const [formData, setFormData] = useState({
    // itemID: ItemID,
    // sellerID: SellerID,
    // finalPrice: Price,
    methodName: "",
    methodType: "",
    description: "",
    status: true,
    trackingNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ItemID: ItemID,
      SellerID: SellerID,
      FinalPrice: Price,
      TransactionStatus: "Initiated",
      PaymentStatus: "Pending",
      PaymentMethodID: {
        MethodName: formData.methodName,
        MethodType: formData.methodType,
        Description: formData.description,
        Status: formData.status,
      },
      UPSTrackingNumber: formData.trackingNumber,
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
      alert("Transaction successful!");
    } else {
      const responseData = await response.json();
      alert(`Failed to create transaction: ${JSON.stringify(responseData)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Method Name"
        name="methodName"
        value={formData.methodName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Method Type"
        name="methodType"
        value={formData.methodType}
        onChange={handleInputChange}
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
      <TextField
        label="Tracking Number"
        name="trackingNumber"
        value={formData.trackingNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Transaction
      </Button>
    </form>
  );
}

export default TransactionForm;
