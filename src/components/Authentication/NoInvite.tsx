import React from "react";

function NoInvite() {
  return (
    <div className="container-fluid d-flex flex-column align-items-stretch justify-content-center text-center vh-100 p-5 ">
      <h1 className="mb-5">Your Email Isn't Valid</h1>
      <p className="fs-4 px-4">
        If you haven't submitted your documents, you will need to do so, so that
        we may verify your identity.
      </p>
      <p className="fs-4 px-4">
        However if you have submitted them, please check back in a few days as
        we may still be processing them.
      </p>
    </div>
  );
}

export default NoInvite;
