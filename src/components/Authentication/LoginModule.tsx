import React, { useState, useEffect } from "react";
import  {Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {logInUser} from '../../redux/actions';
import {getUserFromState} from '../../redux/selectors';


function LoginModule() {

  let history = useHistory();
  let dispatch = useDispatch();
  let user = useSelector(getUserFromState);
  let [loginDisabled, setLoginDisabled] = useState(true);
  let [credentials, setCredentials] = useState({
    email: "saurabsalhotra@gmail.com",
    password: "BSZTD",
  });

  function handleLogin(e: React.SyntheticEvent): void {
    e.preventDefault();
    dispatch(logInUser(credentials));
    
  }

  function handleInput(e: React.SyntheticEvent):void {
    const target = e.currentTarget as HTMLInputElement;
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    setLoginDisabled(!validateCredentials());
    if(user){
      history.push('/f/noticeboard');
    }
  });

  function validateCredentials(): boolean {
    let e = credentials.email;
    let p = credentials.password;
    if (e && p) {
      return e.includes("@") && e.includes(".") && p.length >= 5;
    } else {
      return false;
    }
  }

  return (
    <form className="p-2 d-flex flex-column align-items-stretch">
      <input
        className="form-control my-2"
        type="email"
        name="email"
        placeholder="email"
        value={credentials.email}
        required
        onChange={handleInput}
      />
      <input
        className="form-control my-2"
        type="password"
        name="password"
        placeholder="password"
        value={credentials.password}
        required
        onChange={handleInput}
      />
      <button
        className="btn btn-info mt-4"
        disabled={loginDisabled}
        onClick={handleLogin}
      >
        Login
      </button>
      <Link to="/auth/forgotpassword" className="btn btn-info mt-4">
        Forgot Password
      </Link>
    </form>
  );
}

export default LoginModule;
