import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function CheckoutForm({ Price, ItemID, SellerID }) {
  // State for storing input values
  const [formData, setFormData] = useState({
    itemID: 2,
    finalPrice: 170,
    paymentMethodName: "",
    paymentMethodType: "",
    paymentMethodDescription: "",
    paymentMethodStatus: true,
    cardDetails: { cardName: "", expirationDate: "", csv: "" },
  });

  // State for handling the dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  // Effect to autofill payment method name based on method type
  useEffect(() => {
    if (formData.paymentMethodType === "online") {
      setFormData({ ...formData, paymentMethodName: "Card" });
      setOpenDialog(true);
    } else if (formData.paymentMethodType === "offline") {
      setFormData({
        ...formData,
        paymentMethodName: "Check",
        cardDetails: { cardName: "", expirationDate: "", csv: "" },
      });
      setOpenDialog(false);
    }
  }, [formData.paymentMethodType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      cardDetails: { ...prevState.cardDetails, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fixed test values
    const testPayload = {
      ItemID: 3,
      //   BuyerID: 2,
      SellerID: 3,
      FinalPrice: 100.0,
      TransactionStatus: "Initiated",
      PaymentStatus: "Pending",
      PaymentMethodID: {
        MethodName: "Credit Card",
        MethodType: "Online",
        Description: "Visa Credit Card",
        Status: true,
      },
      UPSTrackingNumber: "1Z999AA10123456784",
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
        body: JSON.stringify(testPayload),
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
      {/* <TextField
        label="Payment Method Name"
        variant="outlined"
        name="paymentMethodName"
        value={formData.paymentMethodName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled
      /> */}
      {/* <TextField
        label="Payment Method Description"
        variant="outlined"
        name="paymentMethodDescription"
        value={formData.paymentMethodDescription}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      /> */}
      <Button type="submit" variant="contained">
        Submit Transaction
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Card Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Name"
            variant="outlined"
            name="cardName"
            value={formData.cardDetails.cardName}
            onChange={handleCardDetailsChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiration Date"
            variant="outlined"
            name="expirationDate"
            value={formData.cardDetails.expirationDate}
            onChange={handleCardDetailsChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CSV"
            variant="outlined"
            name="csv"
            type="password"
            value={formData.cardDetails.csv}
            onChange={handleCardDetailsChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default CheckoutForm;
