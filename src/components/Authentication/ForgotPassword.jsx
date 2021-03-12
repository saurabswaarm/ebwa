import React from "react";

function ForgotPassword() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-2">Forgot Password</h1>
      <p className="fs-4 px-4">
        If you have forgotten your password, please provide us with the email,
        you used to register with the Associaition.{" "}
      </p>
      <form className="p-2 d-flex flex-column align-items-center">
        <input
          className="form-control my-2"
          type="password"
          placeholder="new password"
          required
        />

        <button className="btn btn-info mt-4">Change Passsword</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
