import AppBar from "./components/AppBar/AppBar";
import Authentication from "./components/Authentication/Authentication";
import Welcome from "./components/Welcome";
import ErrorScreen from "./components/ErrorScreen";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { config } from "./config";
import CreatePost from "./components/CreatePost/CreatePost";
import CreateUser from "./components/CreateUser/CreateUser";
import SuccessScreen from "./components/SuccessScreen";
import { Container, Collapse, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Alert, AlertTitle } from "@material-ui/lab";
import { getErrorFromState } from "./redux/selectors";

import { AppError, AppState } from "../types/reduxTypes";

import {removeUserErr, removeNoticeBoardError} from "./redux/actions";

const useStyles = makeStyles({
  outerContainer: {
    padding: "0px",
  },
  innerContainer: {
    paddingTop: "30px",
  },
});

function App() {
  let classes = useStyles();

  return (
    <Router>
      <Container classes={{ root: classes.outerContainer }} maxWidth="xl">
        <AppBar />
        <Container classes={{ root: classes.innerContainer }} maxWidth="md">
          <ErrorDisplay />
          <Switch>
            <Route path="/f/auth/createuser">
              <CreateUser />
            </Route>

            <Route path="/f/auth/*">
              <Authentication />
            </Route>

            <Route exact path="/f/noticeboard/createpost">
              <CreatePost />
            </Route>

            <Route exact path="/f/noticeboard">
              <NoticeBoard />
            </Route>

            <Route path="/f/error">
              <ErrorScreen />
            </Route>

            <Route path="/f/success">
              <SuccessScreen />
            </Route>

            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Container>
      </Container>
    </Router>
  );
}

function ErrorDisplay() {
  let [userErrorVisib, setUserErrorVisib] = useState(true);
  let [nbErrorVisib, setNbErrorVisib] = useState(true);
  let error: AppState["error"] = useSelector(getErrorFromState);

  let dispatch = useDispatch();

  function handleUserErrorClose() {
    setUserErrorVisib(true);
    dispatch(removeUserErr());
  }

  function handleNbErrorClose() {
    setNbErrorVisib(true);
    dispatch(removeNoticeBoardError());
  }

  if (error && (error.noticeBoard || error.user)) {
    return (
      <Box p={2} pb={4}>
        <Collapse in={userErrorVisib}>
          {error.user && (
            <Alert onClose={handleUserErrorClose} severity="error">
              <AlertTitle> Authentication Error</AlertTitle>
              {error.user.message.message}
            </Alert>
          )}
        </Collapse>

        <Collapse in={nbErrorVisib}>
          {error.noticeBoard && (
            <Alert onClose={handleNbErrorClose} severity="error">
              <AlertTitle>NoticeBoard Error</AlertTitle>
              {error.user.message.message}
            </Alert>
          )}
        </Collapse>
      </Box>
    );
  } else {
    return <></>;
  }
}

export default App;
