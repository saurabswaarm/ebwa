import React from "react";

function InvalidPassword() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Invalid Password</h1>
      <p className="fs-4 px-4">
        Sorry, we couldn't validate your password, please check if you have
        typed it correctly. If you have forgotten it please request a new
        password.
      </p>
      <form className="p-2 d-flex flex-column align-items-center">
        <input
          className="form-control my-2"
          type="email"
          placeholder="email"
          required
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="password"
          required
        />
        <button className="btn btn-info mt-4">Login</button>
      </form>
    </div>
  );
}

export default InvalidPassword;
