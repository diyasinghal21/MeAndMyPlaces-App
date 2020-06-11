import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import MyNavLinks from "./NavLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    alignItems: "flex-start",
    paddingTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-start",
    paddingTop: theme.spacing(1),
  },
}));

export default function MainNavigation(props) {
  const classes = useStyles();
  console.log(props.name);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          className={classes.toolbar}
          style={{
            textAlign: "left",
            backgroundColor: "#0d47a1",
            color: "white",
            height: 50,
          }}
        >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            MeAndPlaces  User:{props.name}
          </Typography>
          <MyNavLinks showlog={props.log} logedout={props.logout} id={props.curr} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
