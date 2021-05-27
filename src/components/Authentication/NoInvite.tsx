import { Grid, Box, Typography, Paper } from "@material-ui/core";

function NoInvite() {
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Paper>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              <b>Your Email Isn't Valid</b>
            </Typography>
            <Typography variant="body1">
              If you haven't submitted your documents, you will need to do so,
              so that we may verify your identity. However if you have submitted
              them, please check back in a few days as we may still be
              processing them.
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default NoInvite;

