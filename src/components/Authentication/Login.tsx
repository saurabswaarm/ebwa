import LoginModule from "./LoginModule";
import {Typography, Paper, Box, Grid} from '@material-ui/core';

function Login() {
  return (
    <Grid container justify="center">
      <Grid item xs={11} md={8}>
      <Paper >
      <Box p={3} mx="auto">
        <Typography variant="h4" gutterBottom><b>Login to EBWA portal</b></Typography>
        <Typography variant="body1" gutterBottom>
          If this is you first login, please check your email, you will find a
          username and password, that is specific to you. Please do not share that
          with anyone.
        </Typography>
        <Box mt={2}>
          <LoginModule/>
        </Box>
      </Box>
    </Paper>
      </Grid>
    </Grid>
    
  );
}

export default Login;
