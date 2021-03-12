import React from "react";

function Login() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Log In to EBWA portal</h1>
      <p className="fs-4 px-4">
        If this is you first login, please check your email, you will find a
        username and password, that is specific to you. Please do not share that
        with anyone.
      </p>
      <form className="p-2 d-flex flex-column align-items-stretch">
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

export default Login;
