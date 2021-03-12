import React from "react";

function ResetForgotPassword() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-2">Enter new password</h1>
      <p className="fs-4 px-4">You have initiated a password change</p>
      <form className="p-2 d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-stretch w-75 mb-5">
          <label htmlFor="">Please Enter new password</label>
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
        <button className="btn btn-info mt-4">Change Passsword</button>
      </form>
    </div>
  );
}

export default ResetForgotPassword;
