import React, { useState } from "react";
import UserDetails from "../Components/UserProfile/UserProfile";
import TransactionComponent from "../Components/Transaction/Transaction";
import Button from "@mui/material/Button";

const styles = {
  header: {
    margin: "20px 0",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "100px",
  },
  transaction: {
    marginTop: "20px",
  },
};

const UserProfile = () => {
  const [showComponent, setShowComponent] = useState("details"); // 'details' or 'transactions'

  const handleShowComponent = (component) => () => {
    setShowComponent(component);
  };

  return (
    <div style={styles.container}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#D8BFD8",
          color: "black",
          marginLeft: "50px",
          marginTop: "20px",
          "&:hover": {
            backgroundColor: "#bea8be",
          },
        }}
        onClick={handleShowComponent("details")}
      >
        View Profile
      </Button>
      <Button
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
        onClick={handleShowComponent("transactions")}
      >
        View Transactions
      </Button>

      {showComponent === "details" && <UserDetails />}
      {showComponent === "transactions" && (
        <>
          <h1 style={styles.header}>Purchase History</h1>
          <TransactionComponent role="buyer" style={styles.transaction} />
          <h1 style={styles.header}>Successfully Sold</h1>
          <TransactionComponent role="seller" style={styles.transaction} />
        </>
      )}
    </div>
  );
};

export default UserProfile;
