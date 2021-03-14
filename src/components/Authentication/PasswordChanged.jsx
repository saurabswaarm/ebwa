import React from "react";
import {Link} from "react-router-dom";

function PasswordChanged() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Your Password has been changed</h1>
      <p className="fs-4 px-4">
        You requested a password change and the same has been processed. An email regarding the same was also sent to you.
        You may now proceed by loggin in with your new credentials.
      </p>
      <Link to="/auth/login" className="btn btn-info ">Login</Link>
    </div>
  );
}

export default PasswordChanged;
