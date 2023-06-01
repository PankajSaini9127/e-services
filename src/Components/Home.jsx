
import { Button, Grid,Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
 

  const navigate = useNavigate()

  function handleRequest(){
     navigate('/request')
  }

  return (
    <>
     <Box sx={{height:"100vh",backgroundColor:'#c2c8d1'}}>
       <Grid container sx={{justifyContent:"center", alignItems:'center',height:'100%'}}>
        <Grid item md={10} container sx={{justifyContent:'center'}} spacing={4}>
        <Grid xs={12} sx={{justifyContent:'center'}}>
           <Typography variant='body1' fontSize='45px' fontWeight={500} textAlign='center' textTransform={'capitalize'}>
            Welcome to e services on Click
           </Typography>
           <Typography variant='body1' fontSize='25px' fontWeight={500} textAlign='center' textTransform={'capitalize'}>
            Just relax and sit, we will serve you better
           </Typography>

        </Grid>
        <Grid item md={4} xs={6}>
          
          <Button variant="contained" onClick={handleRequest}>
            Request for free demo
          </Button>
        </Grid>
        </Grid>
       </Grid>
     </Box>
    </>
  )
}

export default Home