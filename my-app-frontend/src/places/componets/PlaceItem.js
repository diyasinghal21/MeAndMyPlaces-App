import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RoomIcon from "@material-ui/icons/Room";
import { lightBlue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import MapIcon from "@material-ui/icons/Map";
import MapModal from "./Modal";
import AlertDialog from "./deletemodal";
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
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "white",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  subheader: {
    color: "white",
  },
}));

export default function PlaceItem(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <RoomIcon color="primary" />
          </Avatar>
        }
        title={props.title}
        subheader={props.address}
        classes={{ title: classes.title, subheader: classes.subheader }}
        style={{
          textAlign: "left",
          backgroundColor: "#03a9f4",
          color: "white",
          height: 50,
        }}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />
      <CardActions disableSpacing>
        {(props.userid === props.creatorid) &&
          <Button
            variant="contained"
            color="primary"
            style={{
              color: "white",
              backgroundColor: "#03a9f4",
            }}
            startIcon={<EditLocationIcon />}
            component={Link}
            to={"/places/update/" + props.id}
          >
            EDIT
        </Button>
        }
        &nbsp;&nbsp;&nbsp;

        {(props.userid === props.creatorid) &&
          <AlertDialog pid={props.id} />
        }
        &nbsp;&nbsp;&nbsp;
        <MapModal />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
