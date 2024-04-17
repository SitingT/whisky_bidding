import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function ConversationsList({ selectConversation }) {
  const [conversations, setConversations] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await fetch(
        "http://localhost:8000/list_conversations/",
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

        setConversations(data);
      } else {
        console.error("Failed to fetch conversations");
      }
    };

    fetchConversations();
  }, [accessToken]);
  console.log("chat list", conversations);

  const handleListItemClick = (user) => {
    navigate(`/chat/${user.id}`);
    selectConversation && selectConversation(user);
  };

  return (
    <List sx={{ width: "100%" }}>
      {conversations.map((user) => (
        <ListItem
          key={user.id}
          //   alignItems="flex-start"
          onClick={() => handleListItemClick(user)}
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                fontSize: "0.8rem",
                backgroundColor: "#D8BFD8",
                color: "black",
              }}
            >
              {`${user.name} ${user.id}`}
            </Avatar>
          </ListItemAvatar>
        </ListItem>
      ))}
    </List>
  );
}

export default ConversationsList;
