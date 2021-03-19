import React from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
      <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
        <h1 className="mb-5">Welcome to Expat Buyer's Welfare Associaiton</h1>
        <p className="fs-4">
          If this is your first time here, please claim your account.
        </p>
        <Link to="/f/auth/createaccount" className="btn btn-info mt-2 align-self-center">
          Claim Account
        </Link>
        <hr className="my-3" />
        <h1 className="mt-4">Already Have an account?</h1>
        <Link to="/f/auth/login" className="btn btn-info mt-2 align-self-center">
          LogIn
        </Link>
      </div>

  );
}

export default CreateAccount;
