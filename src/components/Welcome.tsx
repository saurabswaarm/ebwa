import { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getUserFromState } from "../redux/selectors";
import { resumeSession } from "../redux/actions";
import {
  Grid,
  Paper,
  Divider,
  Typography,
  Box,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles'
import ButtonLink from './WrappedComponents/ButtonLink';

const useStyles = makeStyles({
  paper:{
    height:'100%'
  }
})




function Welcome() {
  let history = useHistory();
  let user = useSelector(getUserFromState);
  let dispatch = useDispatch();

  let [checkedSession, setSessionCheck] = useState(false);

  let classes = useStyles();

  useEffect(() => {
    if (user) {
      console.log(
        "Pre-existing session detected, rerouting. User:" + user.email
      );
      history.push("/f/noticeboard");
    }

    if (!user && !checkedSession) {
      console.log("Found no user, dispatching a resumeSession");
      dispatch(resumeSession());
      setSessionCheck(true);
    }
  });

  return (
    
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Box p={2}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h4">Welcome to</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">
                  <b>Expat Buyer's Welfare Association</b>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider/>
        </Grid>
                

        <Grid item xs={12} container direction="row" spacing={2} justify="center" alignItems="stretch">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Box p={2}>
                <Typography variant="h5" gutterBottom>
                  <b>First time here?</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  If this is your first time here, you will have to claim your
                  account. If you have submitted all your documents, then your
                  email is already registered with us. Just click the link below
                  an we shall mail you the login credentials.
                </Typography>
                <Box mt={4}>
                  <ButtonLink to="/f/auth/createaccount">
                    Claim Account
                  </ButtonLink>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Box p={2}>
                <Typography variant="h5" gutterBottom>
                  <b>Already Have an account?</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  If this is your first time here, you will have to claim your
                  account. If you have submitted all your documents, then your
                  email is already registered with us. Just click the link below
                  an we shall mail you the login credentials.
                </Typography>
                <Box mt={4}>
                  <ButtonLink to="/f/auth/login">LogIn</ButtonLink>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default Welcome;
