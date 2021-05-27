import { Typography, Grid, Box, Collapse } from "@material-ui/core";
import React, {useState} from "react";
import LoginModule from "./LoginModule";
import {Alert} from '@material-ui/lab'

function InvalidPassword() {
  return (
    <Grid container alignContent="center" direction="column" spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          <b>Invalid Password</b>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sorry, we couldn't validate your password, please check if you have
          typed it correctly. If you have forgotten it please request a new
          password.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <LoginModule />
      </Grid>
    </Grid>
  );
}

function ErrorDisplay() {
  let [close, setClose] = useState(true);
  return (
    <Collapse in={close}>
      <Alert onClose={()=>{}}severity="error">This is an error alert — check it out!</Alert>
    </Collapse>
  )
}

export default InvalidPassword;
