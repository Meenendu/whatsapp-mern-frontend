import React, { useEffect } from "react";
import "./App.scss";
import MainScreen from "./pages/MainScreen";
import Login from "./pages/Login";
import { useContextState } from "./utils/stateProvider";
import { actionTypes } from "./utils/reducer";
import socket from "./utils/socketInstance";

function App() {
  const [{ user }, dispatch] = useContextState();

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    console.log(JSON.parse(user));
    if (user) {
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(user),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      socket.emit("user-joined", {
        name: user.displayName,
        _id: user.uid,
        imageUrl: user.photoURL,
        email: user.email,
      });
    }
  }, [user]);

  return <div className="app">{!user ? <Login /> : <MainScreen />}</div>;
}

export default App;
