import React from "react";

function CreateAccount() {
  return (
      <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
        <h1>Welcome to Expat Buyer's Welfare Associaiton</h1>
        <p className="fs-4">
          Please enter the email id you used to send documents to the
          association. Make sure you have access to it as you will be emailed a
          password to login to this portal
        </p>
        <form className="p-2 d-flex flex-column align-items-center">
          <input
            className="form-control"
            type="email"
            placeholder="email"
          />
          <button className="btn btn-info mt-4">Claim Account</button>
        </form>
        <hr className="my-3" />
        <h1 className="mt-4">Already Have an account?</h1>
        <button className="btn btn-info mt-2 align-self-center">
          Claim Account
        </button>
      </div>

  );
}

export default CreateAccount;
