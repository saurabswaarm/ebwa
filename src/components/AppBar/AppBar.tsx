import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOutUser } from "../../redux/actions";
import { getUserFromState } from "../../redux/selectors";

function AppBar() {
  const dispatch = useDispatch();
  const user = useSelector(getUserFromState);
  let history = useHistory();

  function handleLogOut(e: React.SyntheticEvent) {
    document.getElementById("nav-toggle-toggle")?.click();
    dispatch(logOutUser());
    history.push("/f/auth/login");
    console.log(history);
  }


  let loggedInOptions = (
    <>
      <li className="nav-item">
        <span
          className="nav-link active"
          aria-current="page"
          onClick={handleLogOut}
        >
          Log Out
        </span>
      </li>
      <li className="nav-item" onClick={()=>(document.getElementById("nav-toggle-toggle")!.click())}>
        <Link className="nav-link" to="/f/auth/changepassword">
          Change Password
        </Link>
      </li>
    </>
  );

  let loggedOutOptions =(
    <>
     <li className="nav-item" onClick={()=>(document.getElementById("nav-toggle-toggle")!.click())}>
        <Link className="nav-link" to="/f/auth/login" >
          Log In
        </Link>
      </li> 
    </>
  )

  return (
    <nav className="navbar navbar-dark bg-dark" >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EBWA
        </Link>
        <div className="text-light">{user.name}</div>
        <button
          id="nav-toggle-toggle"
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? loggedInOptions : loggedOutOptions }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppBar;
