import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobleContext } from "../App";
import { setAlert, setAuth } from "./ContextAPI/Action";
import { auth_in } from "../Services/Service";
import { useNavigate } from "react-router-dom";

function Login({open,setLogin,setSignUp}) {

  const [formData, setFormData] = useState({email:"",password:""})

  const handleClose = () => {
    setLogin(false)
  };

  const {dispatch} = useContext(GlobleContext)


function handleChange (e){
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  })
}

const navigate = useNavigate();


async function handleSubmit (e){
   e.preventDefault();
   try {
    const user = await auth_in(formData)
    console.log(user)
    if(user.data.success){
        dispatch(setAlert({open:true,variant:'success',message:"Login Successful !!"}))
        dispatch(setAuth(user.data.user))
        navigate('/dashboard')
        setLogin(false)
      }else{
        dispatch(setAlert({open:true,variant:'error',message:"Invalid Creds !!"}))
      }

   } catch (error) {
    console.log(error)
    dispatch(setAlert({open:true,variant:'error',message:"Something Went Wrong Pleaase Try Again Later"}))
   }
}

  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid
        container
        sx={{
          py: 4,
          color: "#FFFFF",
          // width: "600px",
          // px:0,
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
          {/* <Typography variant="body1" textAlign='center' >Login</Typography> */}
          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter Email..."
              sx={{ my: 3 }}
              label={'Email'}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter Password..."
              sx={{ mb: 3 }}
              label={'password'}
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "45px", mb: 2 }}
              type={'submit'}
            >
              Login
            </Button>
            <Typography variant="body1">
              Don't have an account{" "}
              <Button onClick={() =>(setLogin(false), setSignUp(true))}>SignUp Now</Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default Login;
