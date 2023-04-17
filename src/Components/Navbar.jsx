import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import { Stack } from '@mui/system';
import { NavLink, useNavigate} from 'react-router-dom';
import { GlobleContext } from '../App';
import { setAlert, setAuth } from './ContextAPI/Action';

function Navbar({setLogin,setSignUp}) {
const {state:{isAuth},dispatch}= useContext(GlobleContext)

function handleLogout(){
  dispatch(setAlert({open:true,variant:"success",message:"Logout Successfully."}))
  // dispatch(setAuth())
}

const navigate = useNavigate()
  return (
    <>
    <Box sx={{flexGrow:1}}>
        <AppBar position='sticky' top="0" >
           <Toolbar>
          <Button color="inherit"  sx={{fontSize:'30px',fontFamily:"'Dancing Script', cursive",color:"#FFFFF"}} >
                      E-Services
          </Button>
          <Box sx={{flex:1}}>
        <Button color="inherit" sx={{color:"#FFFFF"}} onClick={()=>navigate('/')}>
          Home
          </Button>
          {isAuth?<Button color="inherit" sx={{color:"#FFFFF"}} onClick={()=>navigate('/listing')}>
       Request
          </Button>:<Button color="inherit" sx={{color:"#FFFFF"}} onClick={()=>navigate('/request')} >
         Request For A Service
          </Button>}
        <Button color="inherit" sx={{color:"#FFFFF"}} onClick={()=>navigate('/service')} >
         Our Service
          </Button>
        <Button color="inherit" sx={{color:"#FFFFF"}} onClick={()=>navigate('/contact')}>
        Contact Us
          </Button>

          </Box>

        {
          isAuth?<Button color="inherit" onClick={handleLogout}>Logout</Button>:
           <>
          <Button color="inherit" onClick={()=>setLogin(true)}>Login</Button>
          <Button color="inherit" onClick={()=>setSignUp(true)}>SignUp</Button>
          </>
        }

           </Toolbar>
        </AppBar>
    </Box>
    </>
  )
}

export default Navbar