import React from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  function handleClaimAccount(e) {
    e.preventDefault();
    fetch("http://localhost/api/auth/createaccount", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
     
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body:JSON.stringify({
        email: "saurab@gmail.com",
      })
    });
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
      <h1>Claim your EBWA portal account</h1>
      <p className="fs-4">
        Please enter the email id you used to send documents to the association.
        Make sure you have access to it as you will be emailed a password to
        login to this portal
      </p>
      <form className="p-2 d-flex flex-column align-items-center">
        <input className="form-control" type="email" placeholder="email" />
        <button onClick={handleClaimAccount} className="btn btn-info mt-4">
          Claim Account
        </button>
      </form>
      <hr className="my-3" />
      <h1 className="mt-4">Already Have an account?</h1>
      <Link to="/f/auth/login/" className="btn btn-info mt-2 align-self-center">
        Login
      </Link>
    </div>
  );
}

export default CreateAccount;
