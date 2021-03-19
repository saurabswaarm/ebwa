import React from "react";
import LoginModule from "./LoginModule";

function Login() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Log In to EBWA portal</h1>
      <p className="fs-4 px-4">
        If this is you first login, please check your email, you will find a
        username and password, that is specific to you. Please do not share that
        with anyone.
      </p>
      <LoginModule/>
    </div>
  );
}

export default Login;
