import {
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobleContext } from "../App";
import { setAlert } from "./ContextAPI/Action";
import { sing_up } from "../Services/Service";
import { TrainRounded } from "@mui/icons-material";

function SignUp({ open, setSignUp, setLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
  });

  const { dispatch } = useContext(GlobleContext);

  const handleClose = () => {
    setSignUp(false);
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await sing_up(formData);
      console.log(result.data.success);
      if (result.data.success) {
        dispatch(
          setAlert({
            open: true,
            message: "User Sign Up Successfully.",
            variant: "success",
          })
        );
        setFormData({ name: "", email: "", password: "", mobile: "" });
        setSignUp(false);
        setLogin(true);
      } else {
        dispatch(
          setAlert({
            open: true,
            message: "Something Went Wrong Please.",
            variant: "error",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          message: "Something Went Wrong Please.",
          variant: "error",
        })
      );
    }
  }

  const location = [
    "Sardarpura",
    "Jalori Gate",
    "Ratanada",
    "Bhagat Ki Kothi",
    "Panch Batti",
    "AirForce Area",
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid
        container
        sx={{
          py: 4,
          color: "#FFFFF",
          justifyContent: "center",
        }}
      >
        <Grid item md={8}>
          <Typography
            variant="body1"
            textAlign="center"
            fontSize="35px"
            color={"primary"}
          >
            E-Services
          </Typography>
          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Name..."
              label={"Name"}
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
            <TextField
              variant="outlined"
              fullWidth
              label={"Mobile Number"}
              placeholder="Enter Your Mobile Number..."
              sx={{ mt: 3 }}
              name="mobile"
              onChange={handleChange}
              value={formData.mobile}
            />
            <TextField
              variant="outlined"
              fullWidth
              label={"email"}
              placeholder="Enter Email Address..."
              sx={{ my: 3 }}
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <TextField
              variant="outlined"
              fullWidth
              label={"password"}
              placeholder="Enter Password..."
              sx={{ mb: 3 }}
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            <SelectComponent
              label={"Select Nearby Location"}
              value={formData.location}
              onChange={handleChange}
              name="location"
              options={location}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "45px", mb: 2 }}
              type="submit"
            >
              {" "}
              Sign-Up
            </Button>
            <Typography variant="body1">
              Already have an account{" "}
              <Button onClick={() => (setLogin(true), setSignUp(false))}>
                Login Now
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default SignUp;

const SelectComponent = ({ label, onChange, name, value, options }) => {
  return (
    <>
      {/* <Grid item sm={4}> */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label={label}
          onChange={onChange}
          name={name}
          value={value}
          sx={{mb:2}}
        >
          <MenuItem>Select Service</MenuItem>
          {options.map((row, i) => {
            return (
              <MenuItem value={row} key={i}>
                {row}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/* </Grid> */}
    </>
  );
};
