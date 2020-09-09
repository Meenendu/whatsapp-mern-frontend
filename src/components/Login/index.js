import React from "react";
import "./Login.scss";
import logo from "../../assets/logo.png";

function Login(props) {
  return (
    <div className="login">
      <img src={logo} alt="" />
      <h1>Sign in to WhatsApp</h1>
      <button onClick={props.onClick}>Sign in using Google</button>
    </div>
  );
}

export default Login;
