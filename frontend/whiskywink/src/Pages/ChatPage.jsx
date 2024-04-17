import React from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../Components/Chat/Chat";

const ChatPage = () => {
  let { sellerID, itemID } = useParams(); // Get params from URL

  return (
    <div>
      <h1>Chat about Item ID: {itemID}</h1>
      <ChatBox chatWithUserID={sellerID} itemID={itemID} />
    </div>
  );
};

export default ChatPage;
