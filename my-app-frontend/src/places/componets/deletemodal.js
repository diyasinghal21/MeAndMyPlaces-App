import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorAlert from "../../shared/components/errormodal";
import { useHistory } from "react-router-dom";


export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(null);
  const [err, setErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const history = useHistory();

   const sendRequest = async () => {
    try {
      setisLoading(true);
      const response = await fetch("http://localhost:5000/api/places/" + props.pid, { method: 'DELETE' })
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      history.push('/');
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError(err.message);
      setErr(true);

    }
    setisLoading(false);
    setOpen(false);

  };





  const handleError = () => {
    setError(null);
    setErr(false);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <React.Fragment>
      <ErrorAlert message={error} handleerror={handleError} error={err} />

      <div>
        <Button
          variant="contained"
          color="primary"
          style={{
            color: "white",
            backgroundColor: "#03a9f4",
          }}
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          DELETE
      </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="delete-title"
          aria-describedby="delete-description"
        >
          <DialogTitle id="delete-dialog-title">{"CONFIRM DELETION"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this place?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
          </Button>
            <Button onClick={sendRequest} color="primary" autoFocus>
              Agree
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
