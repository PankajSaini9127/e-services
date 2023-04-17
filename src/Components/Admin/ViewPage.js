import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert } from '../ContextAPI/Action';
import { get_service_id, update_service } from '../../Services/Service';
import { GlobleContext } from '../../App';

function ViewPage() {

    const {id} = useParams()
    console.log(id)
    const {dispatch} = useContext(GlobleContext)
    const navigate = useNavigate()

    const [data,setData] = useState({application:"123456",name:"",email:"",fatherName:"",motherName:"",mobile:"",location:"",service:""})

async function getData (id){
    try {
        const approved = await get_service_id(id)

        if(approved.data.success){
            setData(approved.data.service)
        }else{
            dispatch(setAlert({open:true,variant:'error',message:"Something Went Wrong Pleaase Try Again Later"}))
        }

    } catch (error) {
        console.log(error)
        dispatch(setAlert({open:true,variant:'error',message:"Something Went Wrong Pleaase Try Again Later"}))
    }
}

console.log(data)

useEffect(()=>{
    getData(id)
},[])

   async function handleApprove(){
    try {
        const approved = await update_service(id,{status:"Approved"})
        if(approved.data.success){
            dispatch(setAlert({open:true,variant:'success',message:"Successfull."}))
            navigate(-1)
        }else{
            dispatch(setAlert({open:true,variant:'error',message:"Something Went Wrong Pleaase Try Again Later"}))
        }

    } catch (error) {
        console.log(error)
        dispatch(setAlert({open:true,variant:'error',message:"Something Went Wrong Pleaase Try Again Later"}))
    }
   }

  
  return (
    <>
    {data.length > 0 &&
     <Grid container sx={{justifyContent:"center"}}>
        <Grid item sm={10} sx={{mt:8}}>
            <Grid container>
                <DataFieldStyle field={"Application Number"} value={data[0].application}/>
                <DataFieldStyle field={"Name"} value={data[0].name}/>
                <DataFieldStyle field={"Father Name"} value={data[0].fatherName}/>
                <DataFieldStyle field={"Mother Name"} value={data[0].motherName}/>
                <DataFieldStyle field={"Mobile Number"} value={data[0].mobile}/>
                <DataFieldStyle field={"email"} value={data[0].email}/>
                <DataFieldStyle field={"location"} value={data[0].location}/>
                <DataFieldStyle field={"Service"} value={data[0].service}/>
            </Grid>
        </Grid>

        <Grid item sm={3} sx={{mt:6}}>
            <Button variant="contained" onClick={handleApprove} fullWidth sx={{height:"45px"}}>Approve</Button>
        </Grid>
     </Grid>
}
    </>
  )
}

export default ViewPage

const DataFieldStyle = ({ field, value, href, name, bold, cursor }) => {
    const [open, setOpen] = useState(false);
    const typographyStyle = {
      textTransform: "capitalize",
      color: "var(--main-color)",
      fontWeight: "600",
      // "@media(max-width:900px)": { fontSize: "14px" },
    };
  
    // console.log(href)
    // function handleClick() {
  
    //   saveAs(href, name);
    // }
  
    // function handleView() {
    //   // console.log(href.split(".").slice(-1));
    //   setOpen(true);
    // }
  
    //modal box
    // function handleClose() {
    //   setOpen(false);
    // }
  
    return (
      <Grid item md={3} xs={6} sx={{ p: '0 !important', overflow: "auto" }}>
        {/* {href !== undefined && <ImageView
          open={open}
          handleClose={handleClose}
          href={href !== undefined ? href : ""}
          name={name}
        />} */}
        <Typography variant="h6" sx={typographyStyle}>
          {" "}
          {field}
        </Typography>
        <Stack direction="column"  gap={2}>
          <Typography
            variant="body2"
            sx={{ color: "black", cursor: cursor && "pointer" }}
            fontWeight={bold ? "600" : ""}
            flex={1}
          >
            {" "}
            {value}
          </Typography>
          {/* {href !== undefined && (
            // <Box sx = {{display : 'flex', gap : 1}}>
            //   <VisibilityIcon color={"primary"} onClick={handleView} />
            //   <DownloadIcon color={"primary"} onClick={handleClick} />
            // </Box >
          )} */}
        </Stack>
      </Grid>
    );
  };
