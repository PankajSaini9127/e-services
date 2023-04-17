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
import { setAlert, setData } from "./ContextAPI/Action";
import { GlobleContext } from "../App";
import { register } from "../Services/Service";

const TextFieldWrapper = ({ label, placeholder,onChange,name,value}) => {
  return (
    <Grid item md={4}>
      <FormControl fullWidth>
        <FormLabel>{label}</FormLabel>
        <TextField
          type={"text"}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
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
          <Select labelId="demo-simple-select-label" label={label} onChange={onChange} name={name} value={value}>
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
    status:"Pending"
  });

  const [application, setApplication] = useState("")

  const applicationNumberGenerator = () => {
    var length = 12,
      charset =
        "0123456789",
      random = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      random += charset.charAt(Math.floor(Math.random() * n));
      setApplication(random)
    }
  };

 useEffect(()=>{
    applicationNumberGenerator()
 },[]) 

  const {dispatch} = useContext(GlobleContext)

  function handleChange (e){
        setFormData({
          ...formData,
          [e.target.name]:e.target.value
        })
  }



async function handleSubmit (e){
    e.preventDefault()
  try {
    const response = await register({...formData,application})
    console.log(response.data.success)
    if(response.data.success){
      dispatch(setAlert({open:true,variant:"success",message:"User Register Successfully."}))
      setFormData({
        name:"",
        fatherName: "",
        motherName: "",
        gender: "",
        mobile: "",
        address:"",
        email:"",
        location:"",
        service:"",
        status:"Pending"
      })
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
                  <FormControl>
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
                label={"Select Nearby Location"} 
                value={formData.location}
                  onChange={handleChange}
                  name="location"
                  options={location}
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
