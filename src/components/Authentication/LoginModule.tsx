import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInUser } from "../../redux/actions";
import { getUserFromState } from "../../redux/selectors";
import { Button, TextField, Grid } from "@material-ui/core";

function LoginModule() {
  let history = useHistory();
  let dispatch = useDispatch();
  let user = useSelector(getUserFromState);
  let [loginDisabled, setLoginDisabled] = useState(true);
  let [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // saurabsalhotra@gmail.com
  // BSZTD

  function handleLogin(e: React.SyntheticEvent): void {
    e.preventDefault();
    dispatch(logInUser(credentials, (loggedIn:boolean)=>{
      if(!loggedIn){
        history.push('/f/auth/invalidpassword');
      }
    }));

  }

  function handleInput(e: React.SyntheticEvent): void {
    const target = e.currentTarget as HTMLInputElement;
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    setLoginDisabled(!validateCredentials());
    if (user) {
      history.push("/f/noticeboard");
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
    <Grid container direction="column">
      <Grid item>
        <TextField
          fullWidth
          margin="normal"
          type="email"
          name="email"
          label="email"
          variant="outlined"
          value={credentials.email}
          required
          onChange={handleInput}
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          helperText="Check your email"
          type="password"
          name="password"
          label="password"
          value={credentials.password}
          required
          onChange={handleInput}
        />
      </Grid>

      <Grid item container justify="space-between">
        <Button
          variant="contained"
          color="primary"
          disabled={loginDisabled}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Link to="/auth/forgotpassword" className="btn btn-info mt-4">
          Forgot Password
        </Link>
      </Grid>
    </Grid>
  );
}

export default LoginModule;
