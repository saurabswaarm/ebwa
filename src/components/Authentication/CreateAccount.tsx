import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  marginTop: {
    marginTop:'5px'
  }
})

function CreateAccount() {
  let [email, setEmail] = useState("");
  let [claimButtonDisabled, setClaimButtonDisabled] = useState(true);
  let history = useHistory();

  // MUI styles
  //
  let classes = useStyles();

  async function handleClaimAccount(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(email + " is being claimed");

    let response: Response = await fetch(
      "http://localhost:3006/api/auth/createaccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    let responseJ = await response.json();

    if (responseJ.code == 1) {
      history.push("/f/auth/accountcreated");
    } else if (responseJ.code == 456) {
      history.push("/f/auth/login");
    } else if (responseJ.code == 455) {
      history.push("/f/auth/noinvite");
    } else {
      history.push("/f/error");
    }
  }

  function handleInput(e: React.BaseSyntheticEvent) {
    setEmail(e.currentTarget.value);
    setClaimButtonDisabled(validateCredentials());
  }

  function validateCredentials(): boolean {
    let e:string = email;
    if (e) {
      return e.includes("@") && e.includes(".") && e.length >= 5;
    } else {
      return false;
    }
  }

  return (
    <Grid container alignContent="center" spacing={2} direction="column">
      <Grid item xs={12} md={8}>
        <Paper>
          <Box p={3} mx="auto">
            <Typography variant="h4" gutterBottom>
              <b>Claim your EBWA portal account</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please enter the email id you used to send documents to the
              association. Make sure you have access to it as you will be
              emailed a password to login to this portal
            </Typography>
            <Box mt={2}>
              <TextField
                helperText="Same email you used to send docs."
                fullWidth
                margin="dense"
                type="email"
                name="email"
                label="email"
                variant="outlined"
                required
                onChange={handleInput}
              />

              <Button
                classes={{root:classes.marginTop}}
                variant="contained"
                color="primary"
                onClick={handleClaimAccount}
                disabled={claimButtonDisabled}
              >
                Claim Account
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              <b>Already have an account ?</b>
            </Typography>
            <Link
              to="/f/auth/login/"
              className="btn btn-info mt-2 align-self-center"
            >
              Login
            </Link>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreateAccount;
