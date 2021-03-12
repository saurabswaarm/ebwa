import React from "react";

function ChangePassword() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Change Password</h1>
      <form className="p-2 d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-stretch w-75 mb-5">
          <label htmlFor="">Please Enter old password</label>
          <input
            className="form-control w-100 my-2"
            type="password"
            placeholder="old password"
            required
          />
        </div>
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

export default ChangePassword;
