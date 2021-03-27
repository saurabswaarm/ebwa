import React, { useState, useEffect } from "react";
import  {Link, useHistory } from "react-router-dom";

function LoginModule() {
  let history = useHistory();
  let [loginDisabled, setLoginDisabled] = useState(true);
  let [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e: React.SyntheticEvent): Promise<void> {
    e.preventDefault();
    let response: Response = await fetch(
      "http://localhost:3006/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(credentials),
      }
    );

    let responseJson = await response.json();
    console.log(responseJson);

    if(responseJson.code == 2){
      history.push('/f/noticeboard')
    } else if( responseJson.code == 401) {
      history.push('/f/auth/invalidpassword')
    } 
    // else if(responseJson.code == 458) {
    //   history.push('/f/noticeboard') 
    // }
    else {
      history.push('/f/error?error='+responseJson.payload.message);
    }
  }

  function handleInput(e: React.SyntheticEvent) {
    const target = e.currentTarget as HTMLInputElement;
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    setLoginDisabled(!validateCredentials());
  });

  function validateCredentials(): boolean {
    let e = credentials.email;
    let p = credentials.password;
    let disabled = true;
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
