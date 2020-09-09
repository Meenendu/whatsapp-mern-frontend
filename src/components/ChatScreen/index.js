import React, { useEffect } from "react";
import "./ChatScreen.scss";
import {
  AttachFile,
  MoreVert,
  Search,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import socket from "../../utils/socketInstance";

function ChatScreen() {
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header__left">
          <Avatar />
          <span>Name</span>
        </div>
        <div className="chat__header__right">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <div className="chat__body__message chat__body__received-message">
          <span className="chat__body__message__name chat__body__received-message__name">
            Name
          </span>
          <p className="chat__body__message__msg">
            message
            <span className="chat__body__message__msg__time">time</span>
          </p>
        </div>

        <div className="chat__body__message ">
          <span className="chat__body__message__name ">Name</span>
          <p className="chat__body__message__msg">
            message dsabkjd d asjd as das
            <span className="chat__body__message__msg__time">time</span>
          </p>
        </div>

        <div className="chat__body__message chat__body__received-message">
          <span className="chat__body__message__name chat__body__received-message__name">
            Name
          </span>
          <p className="chat__body__message__msg">
            message geni venvioe venivoe
            <span className="chat__body__message__msg__time">time</span>
          </p>
        </div>

        <div className="chat__body__message chat__body__received-message">
          <span className="chat__body__message__name chat__body__received-message__name">
            Name
          </span>
          <p className="chat__body__message__msg">
            message
            <span className="chat__body__message__msg__time">time</span>
          </p>
        </div>

        <div className="chat__body__message ">
          <span className="chat__body__message__name ">Name</span>
          <p className="chat__body__message__msg">
            message sbkabckla canioc a gfdvdf gdf g df gdf g df g df g df gd
            fgdf gd f
            <span className="chat__body__message__msg__time">time</span>
          </p>
        </div>
      </div>

      <div className="chat__message-pannel">
        <IconButton>
          <InsertEmoticon />
        </IconButton>

        <div className="chat__message-pannel__container">
          <input type="text" placeholder="Type a message" />
        </div>

        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatScreen;
