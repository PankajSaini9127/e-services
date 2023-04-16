import { Grid, Typography } from '@mui/material'
import React from 'react'

//images
import emitraLogo from '../assest/emitralogo.svg'
import CSC from '../assest/CSC-logo.png'
import tax from '../assest/tax.png'
import { Box } from '@mui/system'
import Service from './StyledComponen/Service'

function Services() {
  return (
    <>
    <Grid container sx={{height:"90vh", justifyContent:"center",mt:6}}>
        <Grid item md={10}>
            <Typography variant='body1' fontSize="35px" fontWeight='600' textAlign={'center'}>
                Our Services
            </Typography>
        </Grid>

        <Grid item md={10} >
            <Grid container sx={{justifyContent:'space-between'}} spacing={1}>

          <Service img={emitraLogo} title={'E-mitra Services'} dec={'all type of emitra related services like janaadhar, ration card, domicile and bonofind certificate and online form filling etc.'}/>
          <Service img={CSC} title={'CSC Services'} dec={' CSC and aadhar related service like E-sharm card, labour card, aadhar correction and bankinh service and all th csc portal services.'}/>
          <Service img={tax} title={'Tax Consultancy Services'} dec={'income tax return filling and gst registration, shop registration and Consultancy services at you home.'}/>


        </Grid>
        </Grid>
    </Grid>
    </>
  )
}

export default Services