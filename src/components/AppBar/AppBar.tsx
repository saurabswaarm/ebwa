import React, { Props, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocationDescriptor, Location } from "history";
import {
  Link as RouterLink,
  LinkProps,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";
import { logOutUser } from "../../redux/actions";
import { getUserFromState } from "../../redux/selectors";

//material ui
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import ListItemLink from '../WrappedComponents/ListItemLink';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBarTitle: {
    color: "white",
    textDecoration: "none",
  },
  menuItemLink: {
    textDecoration: "none",
  }
}));



function AppBarX() {
  const dispatch = useDispatch();
  const user = useSelector(getUserFromState);
  let history = useHistory();
  const classes = useStyles();
  let [drawerState, setDrawerState] = useState(false);

  function handleLogOut(e: React.SyntheticEvent) {
    document.getElementById("nav-toggle-toggle")?.click();
    dispatch(logOutUser());
    history.push("/f/auth/login");
    console.log(history);
  }

  function toggleDrawer(e: React.SyntheticEvent) {
    setDrawerState(!drawerState);
  }

  let loggedInOptions = (
    <>
        <ListItemLink primary="Log Out" to="#" onClick={handleLogOut}/>
        <ListItemLink primary="Change Password" to="/f/auth/changepassword" />
    </>
  );

  let loggedOutOptions = (
    <>
        <ListItemLink primary="Log In" to="/f/auth/login" />
    </>
  );

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6">
          <RouterLink
            color="secondary"
            to="/"
            className={`${classes.appBarTitle}`}
          >
            EBWA
          </RouterLink>
        </Typography>
        <div className={classes.grow}></div>
        <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          variant="temporary"
          open={drawerState}
          onClose={toggleDrawer}
        >
          <List onClick={toggleDrawer}>
            <ListItem><ListItemText primary="Menu"/></ListItem>
            <Divider/>
            {user ? loggedInOptions : loggedOutOptions}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarX;
