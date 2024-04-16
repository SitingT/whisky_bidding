import React from "react";
import UserDetails from "../Components/UserProfile/UserProfile";
import TransactionComponent from "../Components/Transaction/Transaction";
const UserProfile = (props) => {
  return (
    <div>
      <UserDetails />
      <p> Buy </p>
      <TransactionComponent role="buyer" />
      <p> Sell </p>
      <TransactionComponent role="seller" />
    </div>
  );
};

export default UserProfile;
