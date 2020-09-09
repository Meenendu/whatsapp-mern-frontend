import React from "react";
import "./SideBar.scss";
import { DonutLarge, Chat, MoreVert, Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ChatItem from "../ChatItem";
import { useContextState } from "../../utils/stateProvider";

function SideBar() {
  const [{ user }, dispatch] = useContextState();
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar alt="" src={user.photoURL} />

        <div className="sidebar__header__right">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
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
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>

      <div className="sidebar__chatlist">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
}

export default SideBar;
