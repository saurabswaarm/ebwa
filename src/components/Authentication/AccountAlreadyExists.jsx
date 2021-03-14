import React from "react";
import LoginModule from "./LoginModule";

function InvalidPassword() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Account Already Exists</h1>
      <p className="fs-4 px-4">
        It seems this account already exists, please just login into it using your credentials.
      </p>
      <LoginModule/>
    </div>
  );
}

export default InvalidPassword;
