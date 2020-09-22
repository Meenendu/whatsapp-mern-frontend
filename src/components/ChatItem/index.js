import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./ChatItem.scss";
import socket from "../../utils/socketInstance";

function ChatItem({ data, onClick }) {
  const [lastMessage, setLastMessage] = useState();

  useEffect(() => {
    socket.on("new-message", (data2) => {
      console.log(data);
      if (data._id === data2[0].room) {
        setLastMessage(`${data2[0].createdBy.name}: ${data2[0].message}`);
      }
    });
  }, []);

  return (
    <div className="chat-item" onClick={() => onClick(data)}>
      <Avatar alt={data.room} src="dsfs.jpg"></Avatar>

      <div className="chat-item__info">
        <span>{data.room}</span>
        <p>
          {lastMessage ||
            (data.lastMessage &&
              data.lastMessage.length > 0 &&
              `${data.lastMessage[0].createdBy.name}: ${data.lastMessage[0].message}`) ||
            ""}
        </p>
      </div>
    </div>
  );
}

export default ChatItem;
