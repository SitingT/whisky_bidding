import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatWithUserID = 2; // The ID of the user you are chatting with, hardcoded for simplicity

  const accessToken = sessionStorage.getItem("accessToken");
  // Function to fetch messages
  const fetchMessages = async () => {
    const response = await fetch(
      `http://localhost:8000/chat/messages/?chat_with_id=${chatWithUserID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  };

  // Function to send a new message
  const sendMessage = async () => {
    const messageData = {
      ReceiverID: chatWithUserID,
      Content: newMessage,
      SendTime: new Date().toISOString(),
      IsSensitive: false,
      RelatedItemID: null,
    };

    const response = await fetch("http://localhost:8000/chat/send-message/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (response.ok) {
      fetchMessages(); // Refresh messages after sending
      setNewMessage(""); // Clear input after sending
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Chat with User {chatWithUserID}
      </Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={msg.Content}
              secondary={`From User: ${msg.SenderID}`}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Message"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        sx={{ my: 2 }}
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send Message
      </Button>
    </Box>
  );
}

export default ChatBox;
