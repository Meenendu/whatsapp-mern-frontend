import React, { useEffect, useState, useRef } from "react";
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
import { useContextState } from "../../utils/stateProvider";
import apiRequest from "../../utils/apiRequests";

function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
  const [{ user, selectedGroup }] = useContextState();
  const messageContainer = useRef(null);
  const [, forcerender] = useState(0);
  const [roomDetail, setRoomDetail] = useState();

  useEffect(() => {
    socket.on("new-message", (data) => {
      console.log(data);
      if (messages) {
        messages.push(data[0]);
        forcerender((x) => x + 1);
        scrollToBottom();
      }
    });
  }, [messages]);

  useEffect(() => {
    socket.on("new-user-joined", (data) => {
      console.log(data);
      if (selectedGroup) getRoomDetail();
    });
  }, [selectedGroup]);

  useEffect(() => {
    console.log(selectedGroup);
    const getMessages = async () => {
      const url = `/message/${selectedGroup._id}`;
      console.log(url);
      const response = await apiRequest(url, "get");
      setMessages(response);
      scrollToBottom();
    };
    if (selectedGroup) {
      socket.emit("join-room", selectedGroup._id);
      getMessages();
      getRoomDetail();
      setRoomDetail(selectedGroup);
    }
  }, [selectedGroup]);

  const getRoomDetail = async () => {
    const url = `/room/${selectedGroup._id}`;
    const response = await apiRequest(url, "get");
    setRoomDetail(response[0]);
    console.log(response[0]);
  };

  const sendMessage = async (e) => {
    e.stopPropagation();
    if (e.which === 13) {
      const url = "/message";
      const body = JSON.stringify({
        message,
        room: roomDetail._id,
      });

      await apiRequest(url, "POST", body);
      setMessage("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messageContainer.current.scrollIntoView();
  };

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const getMembers = () => {
    return roomDetail?.members.map((item) => item.name).join(", ");
  };

  const checkIfUserJoinedThisRoom = () => {
    const x =
      roomDetail &&
      roomDetail?.members.filter(
        (item) => item._id === user.uid || item === user.uid
      );

    if (x && x.length > 0) return true;
    return false;
  };

  const handleJoinRoom = async () => {
    const url = "/room/join";
    const body = JSON.stringify({
      room: selectedGroup._id,
    });
    const res = await apiRequest(url, "POST", body);
    socket.emit("join-room", selectedGroup._id);
    getRoomDetail();
    console.log(res);
  };

  return (
    <div className="chat">
      {selectedGroup && (
        <>
          <div className="chat__header">
            <div className="chat__header__left">
              <Avatar />
              <div className="chat__header__left__text">
                <span className="chat__header__left__text__name">
                  {roomDetail?.room}
                </span>
                <span className="chat__header__left__text__member">
                  {getMembers()}
                </span>
              </div>
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
            {messages?.map((item) => {
              return (
                <div
                  key={item._id}
                  className={`chat__body__message ${
                    item.createdBy._id === user.uid &&
                    "chat__body__received-message"
                  }`}
                >
                  <p
                    className={`chat__body__message__name ${
                      item.createdBy._id === user.uid &&
                      "chat__body__received-message__name"
                    }`}
                  >
                    {item.createdBy.name}
                  </p>
                  <p className="chat__body__message__msg">
                    {item.message}
                    <span className="chat__body__message__msg__time">
                      {formatAMPM(new Date(item.createdOn))}
                    </span>
                  </p>
                </div>
              );
            })}
            <div ref={messageContainer} />
          </div>

          {checkIfUserJoinedThisRoom() ? (
            <div className="chat__message-pannel">
              <IconButton>
                <InsertEmoticon />
              </IconButton>

              <div className="chat__message-pannel__container">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={sendMessage}
                  autoFocus
                />
              </div>

              <IconButton>
                <Mic />
              </IconButton>
            </div>
          ) : (
            <button className="chat__join" onClick={handleJoinRoom}>
              Join Room
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ChatScreen;
