import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export default function Service({img,title,dec}) {
  return (
    <Grid item md={3.5} sx={{border:'1px solid red', borderRadius:'20px',backgroundColor:'lightgrey',p:3}}>
    <Box sx={{display:'flex',justifyContent:'center'}}>
        <Box component={'img'} src={img} height="115px"/>
        </Box>
        <Typography variant='body1' textAlign={'center'} fontSize="25px" fontWeight="600">
            {title}
        </Typography>

        <Typography variant="body1" fontSize="18px" textTransform={'capitalize'} textAlign="center">
           {dec}
        </Typography>
    </Grid>
  )
}
