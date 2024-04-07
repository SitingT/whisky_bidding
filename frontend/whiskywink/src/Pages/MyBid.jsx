import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import BidHistory from "../Components/BidHistory/BidHistory";
const MyBid = () => {
  const [status, setStatus] = useState("pending"); // default status

  return (
    <div>
      <FormControl fullWidth>
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
      <BidHistory customerID={1} status={status} />
    </div>
  );
};

export default MyBid;
