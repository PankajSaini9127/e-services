import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { GlobleContext } from "../../App";
import { setAlert } from "../ContextAPI/Action";

export default function CustomAlert() {

    const {state:{alert},dispatch} = useContext(GlobleContext)

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={() =>
        dispatch(setAlert({ open: false, variant: null, massage: null }))
      }
    >
      <Alert
        onClose={() =>
          dispatch(setAlert({ open: false, variant: null, massage: null }))
        }
        variant={alert.variant}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
