import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red, blue } from "@material-ui/core/colors";
import CreateIcon from "@material-ui/icons/Create";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Icon from "@material-ui/core/Icon";
import SendIcon from "@material-ui/icons/Send";
import { DropzoneDialog } from "material-ui-dropzone";
import { useParams } from "react-router-dom";
import LinearIndeterminate from "../../shared/components/LoadingSpinner";
import ErrorAlert from "../../shared/components/errormodal";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    textAlign: "left",
    justifyContent: "left",
    alignContent: "left",
  },
  avatar: {
    backgroundColor: "white",
    align: "center",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  title: {
    fontSize: "large",
    color: "#3f51b5",
  },
  subheader: {
    fontSize: "large",
    color: "primary",
  },

  img: {
    height: 500,
  },
}));

function DropzoneDialogExample(props) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (files) => {
    setFiles(files);
    setOpen(false);
    if (files) {
      files.forEach((file) => {
        var objectURL = URL.createObjectURL(file);
        props.filearray.push(objectURL);
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
    props.filearray.length = 0;
  };

  return (
    <div>
      <div className="form-group multi-preview">
        {(props.filearray || []).map((url) => (
          <img src={url} alt="..." width="200" height="100" border="3" />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
        style={{ color: "white" }}
      >
        Upload Place Images
      </Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  );
}

export default function UpdatePlace(props) {
  const inputEl1 = useRef(null);
  const inputEl2 = useRef(null);
  //const inputEl3 = useRef(null);
  const inputEl4 = useRef(null);
  const classes = useStyles();
  var imgarr = [];
  const [text1, setText1] = useState(false);
  const [text2, setText2] = useState(false);

  const [error, setError] = useState(null);
  const [err, setErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const pid = useParams().pid;

  const Submit = async () => {


    try {
      setisLoading(true);

      const response = await fetch('http://localhost:5000/api/places/' + pid, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
        body: JSON.stringify({
          title: inputEl1.current.value,
          description: inputEl4.current.value,
          // coordinates: inputEl3.current.value,
          address: inputEl2.current.value

          // image: "https://www.planetware.com/photos-large/MEX/mexico-top-places-cancun-mayan-riviera.jpg",
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setisLoading(false);
      console.log(responseData);


    } catch (err) {
      console.log(err);
      setError(err.message);
      setErr(true);
      setisLoading(false);
    }
  };


  const handleError = () => {
    setError(null);
    setErr(false);
  };




  return (
    <React.Fragment>
      <ErrorAlert message={error} handleerror={handleError} error={err} />
      <Card className={classes.card}>
        {isLoading && <LinearIndeterminate />}
        <CardHeader
          classes={{ title: classes.title, subheader: classes.subheader }}
          avatar={
            <Avatar className={classes.avatar}>
              <CreateIcon color="primary" fontSize="medium" />
            </Avatar>
          }
          title="UPDATE YOUR PLACE"
          subheader={props.stream}
          style={{
            textAlign: "left",
            //backgroundColor: "#3f51b5",
          }}
        />

        <CardContent>
          <Typography variant="body2" color="black" component="p">
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  id="Place-title"
                  label="Place title"
                  placeholder="Enter the title of your place"
                  variant="outlined"
                  fullWidth
                  error={text1}
                  inputRef={inputEl1}
                />
              </div>
              <div>
                <TextField
                  required
                  id="Place-address"
                  label="Place Address"
                  placeholder="Enter the address of your place"
                  variant="outlined"
                  fullWidth
                  error={text1}
                  inputRef={inputEl2}
                />
              </div>
              {/* <div>
              <TextField
                required
                id="Place-coordinates"
                label="Place Coordinates"
                placeholder="Enter the coordinates(eg:Latitude,Longitude) of your place"
                variant="outlined"
                fullWidth
                error={text1}
                inputRef={inputEl3}
              />
            </div> */}
              <div>
                <TextField
                  required
                  id="Place-Description"
                  label="Place Description"
                  placeholder="Enter the description of the place"
                  multiline
                  rows="5"
                  variant="outlined"
                  error={text2}
                  inputRef={inputEl4}
                />
              </div>
              <div className={classes.root}>
                <DropzoneDialogExample filearray={imgarr} />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<SendIcon />}
                  style={{ color: "white" }}
                  onClick={
                    // if (inputEl1.current.value === "") setText1(true);
                    // else setText1(false);
                    // if (inputEl2.current.value === "") setText2(true);
                    // else setText2(false);
                    // if (
                    //   !(
                    //     inputEl1.current.value === "" ||
                    //     inputEl2.current.value === ""
                    //   )
                    // ) {
                    //   setText1(false);
                    //   setText2(false);
                    //   props.onSubmit(
                    //     inputEl1.current.value,
                    //     inputEl2.current.value,
                    //     imgarr
                    //   );
                    // }

                    Submit
                  }
                >
                  Submit
              </Button>
              </div>
            </form>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment >
  );
}
