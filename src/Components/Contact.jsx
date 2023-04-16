import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const TextFieldWrapper =({label,placeholder,msg})=>{
    return(
        <Grid item sm={10}>
        <FormControl fullWidth>
                {/* <FormLabel>{label}</FormLabel> */}
               
               {
                msg? <TextField 
                type={'text'} 
                variant='outlined'
                 label={label}
                  placeholder={placeholder}
                  multiline
                  rows={3}
                //   {
                //     multiLine? mul
                //      :""
                //   }
                  />:<TextField 
                  type={'text'} 
                  variant='outlined'
                   label={label}
                    placeholder={placeholder}
                    />
               } 
            </FormControl>
            </Grid>
    )
}

function Contact() {
  return (
    <>
     <Typography variant='body1' fontSize="35px" fontWeight='600' textAlign={'center'}>
                Contact us
            </Typography>
    <Grid container sx={{height:"80vh",justifyContent:'center'}}>
        
        <Grid item md={5} sx={{mt:4}}>
          <Box component={'form'} sx={{borderRadius:'20px',boxShadow:'2px 2px black,-2px -2px black',minHeight:'10px'}}>
            <Grid container sx={{justifyContent:"space-evenly"}} spacing={2}>
            <TextFieldWrapper label="Name" placeholder={'Enter Your Full Name...'}/>
            <TextFieldWrapper label="Email" placeholder={'Enter Your Email Adress...'}/>
            <TextFieldWrapper label="Phone No" placeholder={'Enter Your Phone No...'}/>
            <TextFieldWrapper label="Location" placeholder={'Enter Your Location...'}/>
            <TextFieldWrapper label="Message" placeholder={'Type Something you want...'} msg={true}/>

            <Grid item xs={4}>
                <Button variant='contained' sx={{px:4,mb:2}}>Contact Now</Button>
            </Grid>
            </Grid>
          </Box>
        </Grid>
    </Grid>
    </>
  )
}

export default Contact