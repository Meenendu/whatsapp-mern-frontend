import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./ChatItem.scss";

function ChatItem({ data, onClick }) {
  return (
    <div className="chat-item" onClick={() => onClick(data)}>
      <Avatar />

      <div className="chat-item__info">
        <span>{data.room}</span>
        <p>Last message</p>
      </div>
    </div>
  );
}

export default ChatItem;
