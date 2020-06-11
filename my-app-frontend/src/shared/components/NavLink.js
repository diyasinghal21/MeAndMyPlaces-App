import React from "react";
import { NavLink } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#FFF",
  },
}));
const MyNavLinks = (props) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      classes={{ indicator: classes.indicator }}
    >
      <Tab
        label={
          <div>
            <GroupIcon style={{ verticalAlign: "middle" }} />
            &nbsp;ALL USERS
          </div>
        }
        component={NavLink}
        to="/"
      />
      <Tab
        label={
          <div>
            <HomeIcon style={{ verticalAlign: "middle" }} />
            &nbsp;MY PLACES
          </div>
        }
        component={NavLink}
        to={"/" + props.id + "/places"}
        disabled={!props.showlog}
      />
      <Tab
        label={
          <div>
            <AddLocationIcon style={{ verticalAlign: "middle" }} />
            ADD PLACE
          </div>
        }
        component={NavLink}
        to="/places/new"
        disabled={!props.showlog}
      />
      {!props.showlog &&
        <Tab

          label={
            <div>
              <LockOpenIcon style={{ verticalAlign: "middle" }} />
             LOG IN
          </div>
          }

          component={NavLink}
          to="/signin"
        />
      }
      {props.showlog &&
        <Tab

          label={
            <div>
              <LockOpenIcon style={{ verticalAlign: "middle" }} />
             LOG OUT
          </div>
          }
          onClick={props.logedout}
          component={NavLink}
          to="/signin"
        />
      }
    </Tabs>
  );
};

export default MyNavLinks;
