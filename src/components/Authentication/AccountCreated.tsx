import { Grid, Box, Typography, Paper } from "@material-ui/core";
import ButtonLink from "../WrappedComponents/ButtonLink";

function AccountCreated() {
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Paper>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              <b>We have mailed you a password.</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Congratulation, your documents have been verified and now you may
              use the portal. We have emailed you a password that you may use to login to the
              portal.
            </Typography>
            <Box pt={2}>
            <ButtonLink
              to="/f/auth/login"
            >
              LogIn
            </ButtonLink>
            </Box>
            
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AccountCreated;
