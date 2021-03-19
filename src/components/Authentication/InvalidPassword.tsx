import React from "react";
import LoginModule from "./LoginModule";

function InvalidPassword() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Invalid Password</h1>
      <p className="fs-4 px-4">
        Sorry, we couldn't validate your password, please check if you have
        typed it correctly. If you have forgotten it please request a new
        password.
      </p>
     <LoginModule/> 
    </div>
  );
}

export default InvalidPassword;
