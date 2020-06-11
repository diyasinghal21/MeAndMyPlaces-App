import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red, blue } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "50%",
    marginLeft: "25%",
    backgroundColor: "white",
    textAlign: "left",
    justifyContent: "left",
    alignContent: "left",
    marginBottom: 10,
    marginTop: 15,
  },
  avatar: {
    backgroundColor: "white",
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  subheader: {
    color: "white",
  },
}));

const UserItem = (props) => {
  const classes = useStyles();
  return (
    <Link to={`/${props.id}/places`} style={{ textDecoration: "none" }}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader
            classes={{ title: classes.title, subheader: classes.subheader }}
            avatar={<Avatar alt={props.name} src={props.image} />}
            title={props.name}
            subheader={props.noofplaces + " Places"}
            style={{
              textAlign: "left",
              backgroundColor: "#03a9f4",
              color: "white",
              height: 50,
            }}
          />
        </CardActionArea>
      </Card>
    </Link>
  );
};
export default UserItem;
