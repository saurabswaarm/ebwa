import React from "react";
import {Link} from 'react-router-dom';

function AccountCreated() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">We have mailed you a password.</h1>
      <p className="fs-4 px-4">
        Congratulation, your documents have been verified and now you may use
        the portal.
      </p>
      <p className="fs-4 px-4">
        We have emailed you a password that you may use to login to the portal.
      </p>
      <Link to="/f/auth/login" className="btn btn-info mt-2 align-self-center">
          LogIn
     </Link>
    </div>
  );
}

export default AccountCreated;
