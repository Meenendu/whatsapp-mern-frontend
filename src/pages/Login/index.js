import React from "react";
import "./Login.scss";
import logo from "../../assets/logo.png";
import { auth, provider } from "../../utils/firebase";
import { useContextState } from "../../utils/stateProvider";
import { actionTypes } from "../../utils/reducer";

function Login() {
  const [, dispatch] = useContextState();

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
    <div className="login">
      <img src={logo} alt="" />
      <h1>Sign in to WhatsApp</h1>
      <button onClick={handleLogin}>Sign in using Google</button>
    </div>
  );
}

export default Login;
