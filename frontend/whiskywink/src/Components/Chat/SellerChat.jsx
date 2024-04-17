import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

function ConversationsList({ selectConversation }) {
  const [conversations, setConversations] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");

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
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {conversations.map((user) => (
        <ListItem
          key={user.id}
          //   alignItems="flex-start"
          //   onClick={() => selectConversation(user)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {user.name} {user.id}
            </Avatar>
          </ListItemAvatar>
        </ListItem>
      ))}
    </List>
    // <div>
    //   {conversations.map((user) => (
    //     <li key={user.id} onClick={() => selectConversation(user)}>
    //       {user.first_name} {user.last_name}
    //     </li>
    //   ))}
    // </div>
  );
}

export default ConversationsList;
