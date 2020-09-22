import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { DonutLarge, Chat, MoreVert, Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ChatItem from "../ChatItem";
import { useContextState } from "../../utils/stateProvider";
import apiRequest from "../../utils/apiRequests";
import socket from "../../utils/socketInstance";
import { actionTypes } from "../../utils/reducer";

function SideBar() {
  const [{ user }, dispatch] = useContextState();
  const [rooms, setRooms] = useState([]);
  const [, forcerender] = useState(0);
  const [filteredRoms, setFilteredRooms] = useState([]);

  useEffect(() => {
    socket.on("new-room", (data) => {
      console.log(data);
      if (rooms) {
        rooms.unshift(data);
        filteredRoms.unshift(data);
        forcerender((x) => x + 1);
      }
    });
  }, [rooms]);

  useEffect(() => {
    (async () => {
      const url = "/room";
      const response = await apiRequest(url, "get");
      setRooms(response);
      setFilteredRooms(response);
    })();
  }, []);

  const createNewRoom = async () => {
    const roomName = prompt("Enter Name of new Chat Room");
    if (roomName) {
      const body = {
        room: roomName,
        members: user.uid,
      };
      const res = await apiRequest("/room", "post", JSON.stringify(body));
      console.log(res._id);
      socket.emit("join-room", res._id);
    }
  };

  const selectGroup = (item) => {
    dispatch({
      type: actionTypes.SELECTED_GROUP,
      group: item,
    });
  };

  const handleSearch = (e) => {
    if (e.target.value) {
      const x = rooms.filter((item) => item.room.includes(e.target.value));
      setFilteredRooms(x);
    } else {
      setFilteredRooms(rooms);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar alt="" src={user.photoURL} />

        <div className="sidebar__header__right">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton onClick={createNewRoom}>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__search__container">
          <Search />
          <input
            type="text"
            placeholder="Search or start a new chat"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="sidebar__chatlist">
        {filteredRoms.map((room) => (
          <ChatItem key={room._id} data={room} onClick={selectGroup} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
