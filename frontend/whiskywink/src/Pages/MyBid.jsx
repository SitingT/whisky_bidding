import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BidHistory from "../Components/BidHistory/BidHistory";
const MyBid = () => {
  const [status, setStatus] = useState("pending");
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {" "}
      {/* Adjust height as needed */}
      <FormControl sx={{ width: "60%" }}>
        <InputLabel id="status-select-label">Bid Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={status}
          label="Bid Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="lose">Lose</MenuItem>
          <MenuItem value="win">Win</MenuItem>
        </Select>
      </FormControl>
      <BidHistory status={status} />
    </Box>
  );
};

export default MyBid;
