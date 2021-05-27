import React from "react";
import { Grid, TextField, Paper, Box, Typography } from "@material-ui/core";

function ChangePassword() {
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Paper>
          <Box p={2}>
            <Typography variant="h5" gutterBottom>
              <b>Change Password</b>
            </Typography>
            <Box mt={3}>
              <Typography variant="body1">
                Please enter your old password
              </Typography>
              <TextField label="old password" margin="dense" variant="outlined" fullWidth />
            </Box>
            <Box mt={3}>
            <Typography variant="body1">
                Please enter your old password
              </Typography>
              <TextField label="new password" margin="dense" variant="outlined" fullWidth /> 
              <TextField label="confirm new password" margin="dense" variant="outlined" fullWidth /> 
            </Box>
          </Box>
          
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
