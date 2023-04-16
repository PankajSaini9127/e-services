import { Box, Button, Dialog, Grid, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobleContext } from '../App';
import { setAlert } from './ContextAPI/Action';

function SignUp({open,setSignUp,setLogin}) {

  const[formData, setFormData] = useState({name:"",email:"",password:"",mobile:""})

  const {dispatch} = useContext(GlobleContext)

    const handleClose = () => {
      setSignUp(false)
    };

    function handleChange (e){
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }

    function handleSubmit(e){
      e.preventDefault()

      dispatch(setAlert({open:true,message:"User Sign Up Success Full",variant:"success"}))
      setSignUp(false)
       console.log(formData)

    }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid
        container
        sx={{
            py:4,
          color: "#FFFFF",
          justifyContent: "center",
        }}
      >
        <Grid item md={8}>
          <Typography variant="body1" textAlign='center' fontSize="35px" color={'primary'}>E-Services</Typography>
          <Box component={"form"} onSubmit={handleSubmit}>
            <TextField 
            variant="outlined" 
            fullWidth
            placeholder="Name..."
            label={'Name'}
            name="name"
            onChange={handleChange}
            value={formData.name}
            />
            <TextField 
            variant="outlined" 
            fullWidth
            label={'Mobile Number'}
            placeholder="Enter Your Mobile Number..."
            sx={{mt:3}}
            name="mobile"
            onChange={handleChange}
            value={formData.mobile}
            />
            <TextField 
            variant="outlined" 
            fullWidth
            label={'email'}
            placeholder="Enter Email Address..."
            sx={{my:3}}
            name="email"
            onChange={handleChange}
            value={formData.email}
            />
            <TextField 
            variant="outlined" 
            fullWidth
            label={'password'}
            placeholder="Enter Password..."
            sx={{mb:3}}
            name="password"
            onChange={handleChange}
            value={formData.password}
            />
            <Button variant="contained" fullWidth sx={{height:"45px",mb:2}} type='submit' > Sign-Up</Button>
            <Typography variant="body1">Already have an account <Button onClick={()=>(setLogin(true), setSignUp(false))}>Login Now</Button></Typography>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default SignUp