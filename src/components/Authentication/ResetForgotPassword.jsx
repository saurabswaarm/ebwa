import React from "react";
import { Link } from "react-router-dom";

function ResetForgotPassword() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-2">Enter new password</h1>
      <p className="fs-4 px-4">You have initiated a password change. A secret token has been mailed to your email account registered with us. Please open that mail and provide us with the secret access token.</p>
      <form className="p-2 mt-4 d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-stretch w-75 mb-3">
          <input
            className="form-control w-100 my-2"
            type="text"
            placeholder="secret token"
            required
          />
          <input
            className="form-control w-100 my-2"
            type="password"
            placeholder="new password"
            required
          />
          <input
            className="form-control w-100 my-2"
            type="password"
            placeholder="confirm new password"
            required
          />
        </div>
        <Link to="/auth/passwordchanged" className="btn btn-info ">Change Passsword</Link>
      </form>
    </div>
  );
}

export default ResetForgotPassword;
