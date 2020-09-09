import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./ChatItem.scss";

function ChatItem() {
  return (
    <div className="chat-item">
      <Avatar />

      <div className="chat-item__info">
        <span>Name sahjdas xj asjx jas xjafdsf dfs dfsd</span>
        <p>Last message</p>
      </div>
    </div>
  );
}

export default ChatItem;
