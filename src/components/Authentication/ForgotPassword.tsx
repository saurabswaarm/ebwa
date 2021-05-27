import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import ButtonLink from "../WrappedComponents/ButtonLink";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import React, { useState } from "react";

const disablerStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper_root: {
      position: "relative",
      color: (props: ForgotPasswordComponentProps) =>
        props.disabled ? grey[300] : theme.palette.text.primary,
      "& button": {
        backgroundColor: (props: ForgotPasswordComponentProps) =>
          props.disabled ? grey[300] : theme.palette.primary.main,
      },
    },
  })
);

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
  },
  ab: {
    position: "absolute",
    zIndex: 1,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

interface ForgotPasswordComponentProps {
  disabled: boolean;
  handleSubmit: () => void;
  handleUserInput: (e: React.SyntheticEvent) => void;
  value: string;
}

function ForgotPassword() {
  let [emailFound, setEmailFound] = useState(true);
  let classes = useStyles();
  let [email, setEmail] = useState("");
  let [unsubmited, setUnsubmited] = useState(true);
  let [submiting, setSubmiting] = useState(false);
  let [submited, setSubmited] = useState(false);

  function resetComponent() {
    setUnsubmited(true);
    setSubmiting(false);
    setSubmited(false);
    setEmail("");
  }

  function handleUserInput(e: React.SyntheticEvent) {
    let input = (e.currentTarget as HTMLInputElement).value;
    setEmail(input);
  }

  function handleSubmit() {
    setSubmiting(true);
    setTimeout(() => {
      setUnsubmited(false);
      setSubmiting(false);
      setSubmited(true);
      Math.random() > 0.5 ? setEmailFound(true) : setEmailFound(false);
    }, 500);
  }

  return (
    <Grid container justify="center">
      <Grid item container xs={12} md={8} direction="column" spacing={2}>
        <Grid item>
          <>
            {unsubmited && (
              <ForgotPasswordComponent
                disabled={submiting}
                handleUserInput={handleUserInput}
                handleSubmit={handleSubmit}
                value={email}
              />
            )}
            {submited && (
              <ForgotPasswordSuccess
                email={email}
                failure={!emailFound}
                reset={resetComponent}
              />
            )}
          </>
        </Grid>
        <Grid item>
          {emailFound && <Paper>
            <Box p={2}>
              <Typography variant="body1" gutterBottom>
                Please check your email. If you have received a{" "}
                <b>secret token</b> please click the button below, else wait for
                sometime or revisit this page later.
              </Typography>
              <ButtonLink
                className={classes.root}
                to="/f/auth/resetforgotpassword"
              >
                I have received the secret token.
              </ButtonLink>
            </Box>
          </Paper>}
        </Grid>
      </Grid>
    </Grid>
  );
}

function ForgotPasswordComponent(props: ForgotPasswordComponentProps) {
  let classes = useStyles();
  let paperClasses = disablerStyle(props);

  return (
    <Paper classes={{ root: paperClasses.paper_root }}>
      <Backdrop classes={{ root: classes.ab }} open={props.disabled}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          <b>Forgot Password</b>
        </Typography>
        <Typography variant="body1">
          If you have forgotten your password, please provide us with the email,
          you used to register with the Associaition.
        </Typography>
        <TextField
          label="email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={props.handleUserInput}
          value={props.value}
        />
        <Button
          classes={{ root: classes.root }}
          variant="contained"
          color="primary"
          onClick={props.handleSubmit}
        >
          Request new password
        </Button>
      </Box>
    </Paper>
  );
}

export default ForgotPassword;

function ForgotPasswordSuccess(props: {
  email: string;
  failure: boolean;
  reset: () => void;
}) {
  let classes = useStyles();

  let success = {
    heading: <b>We sent you an email.</b>,
    body: (
      <>
        An email has been sent to <b>{props.email}</b> that contains a secret
        token.
      </>
    ),
  };

  let failure = {
    heading: <b>No such email found</b>,
    body: (
      <>
        We could not verify that <b> {props.email}</b> belongs in our records,
        are you sure you have mailed us the documents?
      </>
    ),
  };
  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          {props.failure ? failure.heading : success.heading}
        </Typography>
        <Typography variant="body1">
          {props.failure ? failure.body : success.body}
        </Typography>
        <Button
          className={classes.root}
          variant="contained"
          color="primary"
          onClick={props.reset}
        >
          Resend Link
        </Button>
      </Box>
    </Paper>
  );
}
