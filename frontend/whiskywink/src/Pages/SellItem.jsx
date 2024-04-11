import React, { useState } from "react";
import WhiskyForm from "../Components/WhiskyForm/WhiskyForm";
import WhiskySell from "../Components/whiskySell/ WhiskySell";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const SellItem = () => {
  const [showComponent, setShowComponent] = useState("form"); // 'form', 'sell', or 'login'
  const accessToken = sessionStorage.getItem("accessToken"); // Retrieve access token from session storage

  const handleShowComponent = (component) => () => setShowComponent(component);

  return (
    <div>
      {accessToken ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowComponent("form")}
            sx={{
              backgroundColor: "#D8BFD8",
              color: "black",
              marginLeft: "50px",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#bea8be",
              },
            }}
          >
            Add Whisky
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleShowComponent("sell")}
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
            View Sell History
          </Button>
          {showComponent === "form" && <WhiskyForm />}
          {showComponent === "sell" && <WhiskySell />}
        </>
      ) : (
        <Typography variant="body1" sx={{ margin: 1 }}>
          Please log in to view your sell history.
        </Typography>
      )}
    </div>
  );
};

export default SellItem;
