import React from "react";
import PlaceItem from "./PlaceItem";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor: "lightblue",
    textAlign: "center",
    justifyContent: "left",
    alignContent: "center",
  },
}));

const PlaceList = (props) => {
  const classes = useStyles();
  if (props.items.length === 0)
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>No Places created !</CardContent>
          <Button size="small" color="primary">
            Create it now!
          </Button>
        </Card>
      </div>
    );
  return (
    <ul>
      {props.items.map((user) => (
        <PlaceItem
          key={user.id}
          id={user.id}
          title={user.title}
          description={user.description}
          image={user.image}
          address={user.address}
          coordinates={user.coordinates}
          creatorid={user.creator}
          userid={props.us}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
