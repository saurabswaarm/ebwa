
import LoginModule from "./LoginModule";
import { Typography, Grid, Box } from "@material-ui/core";

function InvalidPassword() {
  return (
    <Grid container alignContent="center" direction="column" spacing={3}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          <b>Account Already Exists</b>
        </Typography>
        <Typography variant="body1" gutterBottom>
        It seems this account already exists, please just login into it using your credentials.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <LoginModule />
      </Grid>
    </Grid>
  );
}

export default InvalidPassword;
