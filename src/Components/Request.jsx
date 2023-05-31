import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { addService, setAlert, setData } from "./ContextAPI/Action";
import { GlobleContext } from "../App";
import { get_provider, register } from "../Services/Service";
import { useNavigate } from "react-router-dom";

const TextFieldWrapper = ({ label, placeholder,onChange,name,value,type}) => {
  return (
    <Grid item md={4}>
      <FormControl fullWidth>
        <FormLabel>{label}</FormLabel>
        <TextField
          // type={"text"}
          variant="outlined"
          label={label}
          type= {type?type:"text"}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          required={true}
        />
      </FormControl>
    </Grid>
  );
};

const SelectComponent = ({ label,onChange,name,value,options }) => {
  return (
    <>
      <Grid item sm={4}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select labelId="demo-simple-select-label" required label={label} onChange={onChange} name={name} value={value}>
          <MenuItem>Select Service</MenuItem>
            {
              options.map((row,i)=>{
                return <MenuItem value={row} key={i}>{row}</MenuItem>
              })
            }
           
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

const service = [
  "E-Mitra Services",
  "CSC Services",
  "Aadhar Services",
  "Consultancy Services",
  "Hire A TAX Representative",
  "Banking Services",
  "Birth Registration",
  "Marrige Registration",
  "Death Registration"
]

const location =[
  "Sardarpura",
  "Jalori Gate",
  "Ratanada",
  "Bhagat Ki Kothi",
  "Panch Batti",
  "AirForce Area"
]

function Request() {
  const {dispatch,state} = useContext(GlobleContext)

  const [provider,setProvider] = useState([])

  const [formData, setFormData] = useState({
    name:"",
    fatherName: "",
    motherName: "",
    gender: "",
    mobile: "",
    address:"",
    email:"",
    location:"",
    service:"",
    status:"Pending",
    user_id:state.data.id,
    timeslot:"",
    application:"",
    provider:""
  });


  const applicationNumberGenerator = () => {
    var length = 12,
      charset =
        "0123456789",
      random = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      random += charset.charAt(Math.floor(Math.random() * n));
      setFormData({...formData,application:random})
    }
  };

 useEffect(()=>{
    applicationNumberGenerator()
 },[]) 



  function handleChange (e){
        setFormData({
          ...formData,
          [e.target.name]:e.target.value
        })
  }

const navigate = useNavigate()

async function handleSubmit (e){
    e.preventDefault()
  try {
    const response = await register(formData)
    console.log(response.data.success)
    if(response.data.success){
      dispatch(setAlert({open:true,variant:"success",message:"User Register Successfully."}))
      dispatch(addService(formData))
      navigate('/preview-service')
    }else{
      dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
    }
  } catch (error) {
    console.log(error)
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
  }
   
  }

async function getProvider (location){
  try {
    const response = await get_provider(location)
    console.log(response.data)
    if(response.data.success){
      setProvider(response.data.provider.map(row=>row.name))
    }else{
      dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
    }
  } catch (error) {
    console.log(error)
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
  }
}



  return (
    <>
      <Typography
        variant="body1"
        fontSize="35px"
        fontWeight="600"
        textAlign={"center"}
      >
        Request For Home Service
      </Typography>
      <Grid container sx={{ height: "90vh", justifyContent: "center", mt: 8 }}>
        <Grid item md={8} sx={{ mt: 4 }}>
          <Box
            component={"form"}
            sx={{
              borderRadius: "20px",
              boxShadow: "2px 2px black,-2px -2px black",
              minHeight: "10px",
            }}
            onSubmit={handleSubmit}
          >
            <Container>
              <Grid
                container
                sx={{ justifyContent: "space-evenly" }}
                spacing={2}
              >
                <TextFieldWrapper
                  label="First Name"
                  placeholder={"Enter Your First Name"}
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  
                />
                <TextFieldWrapper
                  label="Father Name"
                  placeholder={"Enter Your Father Name"}
                  value={formData.fatherName}
                  onChange={handleChange}
                  name="fatherName"
                />
                <TextFieldWrapper
                  label="Mother Name"
                  placeholder={"Enter Your Mother Name"}
                  value={formData.motherName}
                  onChange={handleChange}
                  name="motherName"
                />

                <Grid item md={4}>
                  <FormControl required>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      // name="radio-buttons-group"
                      value={formData.gender}
                      onChange={handleChange}
                      name="gender"
                      
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <TextFieldWrapper
                  label="Email"
                  placeholder={"Enter Your Email Adress..."}
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type={'email'}
                />
                <TextFieldWrapper
                  label="Phone No"
                  placeholder={"Enter Your Phone No..."}
                  value={formData.mobile}
                  onChange={handleChange}
                  name="mobile"
                />
                <TextFieldWrapper
                  label="Address"
                  placeholder={"Enter Your Address..."}
                  value={formData.address}
                  onChange={handleChange}
                  name="address"
                />
                 <SelectComponent 
                label={"Time Slot"}
                value={formData.timeslot}
                  onChange={handleChange}
                  name="timeslot"
                  options={["10AM - 12PM", "12PM - 2PM","2PM - 4PM","4PM - 6PM"]}
                />
                <SelectComponent 
                label={"Select Nearby Location"} 
                value={formData.location}
                  onChange={(e)=>{handleChange(e);getProvider(e.target.value)}}
                  name="location"
                  options={location}
                />
                 <SelectComponent 
                label={"Select Service Provider"} 
                value={formData.provider}
                  onChange={handleChange}
                  name="provider"
                  options={provider}
                />
                <SelectComponent 
                label={"Service Type"}
                value={formData.service}
                  onChange={handleChange}
                  name="service"
                  options={service}
                />
              </Grid>

              <Grid container sx={{ justifyContent: "space-evenly", mt: 2 }}>
                <Grid item>
                  <Button variant="contained" sx={{ px: 4, mb: 2 }} type='submit'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Request;
