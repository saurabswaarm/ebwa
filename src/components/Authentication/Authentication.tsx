import {
    Switch,
    Route
  } from "react-router-dom"

import CreateAccount from "./CreateAccount"
import AccountCreated from "./AccountCreated"
import NoInvite from "./NoInvite";
import AccountAlreadyExists from "./AccountAlreadyExists";
import Login from "./Login";
import InvalidPassword from "./InvalidPassword";
import ForgotPassword from "./ForgotPassword";
import ResetForgotPassword from "./ResetForgotPassword";
import ChangePassword from "./ChangePassword";
import PasswordChanged from "./PasswordChanged";

 export default function Authentication() {
      return (
          <Switch>

              <Route path="/f/auth/accountcreated">
                  <AccountCreated/>
              </Route>

              <Route path="/f/auth/createaccount">
                <CreateAccount/>
              </Route>

              <Route path="/f/auth/noinvite">
                <NoInvite/>
              </Route>

              <Route path="/f/auth/accountalreadyexists">
                <AccountAlreadyExists/>
              </Route>

              <Route path="/f/auth/login">
                <Login/>
              </Route>

              <Route path="/f/auth/invalidpassword">
                <InvalidPassword/>
              </Route>

              <Route path="/f/auth/forgotpassword">
                <ForgotPassword/>
              </Route>

              <Route path="/f/auth/resetforgotpassword">
                <ResetForgotPassword/>
              </Route>

              <Route path="/f/auth/changepassword">
                <ChangePassword/>
              </Route>

              <Route path="/f/auth/passwordChanged">
                <PasswordChanged/>
              </Route>
              
          </Switch>
      )
  }

