import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React, { useContext, useState } from "react";
import { submit_contact_query } from "../Services/Service";

import { setAlert } from "./ContextAPI/Action";
import { GlobleContext } from "../App";
import { useNavigate } from "react-router-dom";

const TextFieldWrapper = ({ label, placeholder, msg,handletarget,name ,email}) => {
  return (
    <Grid item sm={10}>
      <FormControl fullWidth>
        {/* <FormLabel>{label}</FormLabel> */}

        {msg ? (
          <TextField
           
            variant="outlined"
            label={label}
            placeholder={placeholder}
            multiline
            rows={3}
            onChange={handletarget}
            name={name}
            required={true}
          />
        ) : (
          <TextField
          type={email?"email":"text"}
            variant="outlined"
            required={true}
            label={label}
            placeholder={placeholder}
            onChange={handletarget}
            name={name}
          />
        )}
      </FormControl>
    </Grid>
  );
};

function Contact() {
  const location = [
    "Sardarpura",
    "Jalori Gate",
    "Ratanada",
    "Bhagat Ki Kothi",
    "Panch Batti",
    "AirForce Area",
  ];

  const [formData,setFormData] = useState({name:"",email:"",phone:"",message:""})

function handleChange(e){
  console.log(e.target.name)
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  })
}

const {dispatch} = useContext(GlobleContext)

const navigate = useNavigate()

async function handleSubmit(e){
  e.preventDefault();
  try {
    console.log(formData);
    const result  = await submit_contact_query(formData)
    console.log(result)
    if(result.data.success){
     
      dispatch(setAlert({open:true,variant:'success',message:"Contact Query Submit Successfully."}));
      setFormData({name:"",email:"",phone:"",message:""})
      navigate(-1)
    }
  } catch (error) {
    console.log(error)
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
        Contact us
      </Typography>
      <Grid container sx={{ height: "80vh", justifyContent: "center" }}>
        <Grid item md={5} sx={{ mt: 4 }}>
          <Box
            component={"form"}
            sx={{
              borderRadius: "20px",
              boxShadow: "2px 2px black,-2px -2px black",
              minHeight: "10px",
            }}
            onSubmit={handleSubmit}
          >
            <Grid container sx={{ justifyContent: "space-evenly" }} spacing={2}>
              <TextFieldWrapper
                label="Name"
                placeholder={"Enter Your Full Name..."}
                name="name"
                handletarget={(e)=>handleChange(e)}
                value={formData.name}
              />
              <TextFieldWrapper
                label="Email"
                name="email"
                email="true"
                placeholder={"Enter Your Email Adress..."}
                handletarget={(e)=>handleChange(e)}
                value={formData.email}
              />
              <TextFieldWrapper
                label="Phone No"
                name="phone"
                placeholder={"Enter Your Phone No..."}
                handletarget={(e)=>handleChange(e)}
                value={formData.phone}
              />
              {/* <TextFieldWrapper label="Location" placeholder={'Enter Your Location...'}/> */}
              <SelectComponent
                label={"Select Nearby Location"}
                value={formData.location}
                onChange={(e)=>handleChange(e)}
                name="location"
                options={location}
              />
              <TextFieldWrapper
                label="Message"
                name="message"
                value={formData.message}
                handletarget={(e)=>handleChange(e)}
                placeholder={"Type Something you want..."}
                msg={true}
              />

              <Grid item xs={6}>
                <Button variant="contained" sx={{ px: 4, mb: 2 }} type="submit" fullWidth>
                  Submit Query
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Contact;

const SelectComponent = ({ label, onChange, name, value, options }) => {
  return (
    <>
      <Grid item sm={10}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            required
            label={label}
            onChange={onChange}
            name={name}
            value={value}
          >
            <MenuItem>Select Location</MenuItem>
            {options.map((row, i) => {
              return (
                <MenuItem value={row} key={i}>
                  {row}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};
