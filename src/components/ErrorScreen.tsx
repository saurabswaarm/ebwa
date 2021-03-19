import React from "react";
import { Link } from "react-router-dom";

function ErrorScreen({error}) {
  return (
      <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5">
        <h1 className="mb-5">We Faced an error.</h1>
        <p className="fs-4">
          We are sorry something went wrong please use the back button to go where you were.
        </p>
        <p> {error.errorCode !== 0 ? error.error: ''} </p>
        
      </div>

  );
}

ErrorScreen.defaultProps = {
  error: {
    errorCode:0,
    error:'No errors'
  }
}

export default ErrorScreen;
