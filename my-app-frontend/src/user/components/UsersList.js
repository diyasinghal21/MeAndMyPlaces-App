import React from "react";
import UserItem from "./usersItems";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor: "lightblue",
    textAlign: "center",
    justifyContent: "left",
    alignContent: "center",
  },
}));

const UserList = (props) => {
  const classes = useStyles();
  if (props.items.length === 0)
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>No users Found!</CardContent>
        </Card>
      </div>
    );
  return (
    <ul>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          noofplaces={user.places.length}
          image={user.image}
        />
      ))}
    </ul>
  );
};

export default UserList;
