import React, { useEffect } from "react";
import "./App.scss";
import ChatScreen from "./components/ChatScreen";
import Sidebar from "./components/SideBar";
import Login from "./components/Login";
import { auth, provider } from "./utils/firebase";
import { useContextState } from "./utils/stateProvider";
import { actionTypes } from "./utils/reducer";

function App() {
  const [state, dispatch] = useContextState();

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    console.log(JSON.parse(user));
    if (user) {
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(user),
      });
    }
  }, []);

  const handleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        window.localStorage.setItem("user", JSON.stringify(result.user));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="app">
      {!state.user ? (
        <Login onClick={handleLogin} />
      ) : (
        <div className="app__container">
          <Sidebar />
          <ChatScreen />
        </div>
      )}
    </div>
  );
}

export default App;
