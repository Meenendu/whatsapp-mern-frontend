import React from "react";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/SideBar";

function MainScreen() {
  return (
    <div className="app__container">
      <Sidebar />
      <ChatScreen />
    </div>
  );
}

export default MainScreen;
