import React from "react";
import CustomerBidStatus from "../Components/BidHistory/BidHistory";

const MyBid = () => {
  return (
    <div>
      <CustomerBidStatus customerID={1} status="pending" />
    </div>
  );
};

export default MyBid;
