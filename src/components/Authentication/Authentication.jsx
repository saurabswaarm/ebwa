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

              <Route path="/auth/accountcreated">
                  <AccountCreated/>
              </Route>

              <Route path="/auth/createaccount">
                <CreateAccount/>
              </Route>

              <Route path="/auth/noinvite">
                <NoInvite/>
              </Route>

              <Route path="/auth/accountalreadyexists">
                <AccountAlreadyExists/>
              </Route>

              <Route path="/auth/login">
                <Login/>
              </Route>

              <Route path="/auth/invalidpassword">
                <InvalidPassword/>
              </Route>

              <Route path="/auth/forgotpassword">
                <ForgotPassword/>
              </Route>

              <Route path="/auth/resetforgotpassword">
                <ResetForgotPassword/>
              </Route>

              <Route path="/auth/changepassword">
                <ChangePassword/>
              </Route>

              <Route path="/auth/passwordChanged">
                <PasswordChanged/>
              </Route>
              
          </Switch>
      )
  }

