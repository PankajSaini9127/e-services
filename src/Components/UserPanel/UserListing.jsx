import { Box, Button, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobleContext } from '../../App';
import { setAlert } from '../ContextAPI/Action';
import { get_service_user } from '../../Services/Service';


function UserListing() {

const navigate = useNavigate();

const {dispatch,state} = useContext(GlobleContext)
console.log(state.data.id)


const [data,setData] = useState([])
console.log(data)

async function fetchData (location){
    try {
        const response = await get_service_user(location)
        console.log(response)
        if(response.data.success){
          setData(response.data.services)
        }else{
            dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))   
        }
    } catch (error) {
        console.log(error)
        dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
    }
}

useEffect(()=>{
    fetchData(state.data.location)
},[])

const detailsButton = (e) => {
    const id = e.id;

    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: "rgb(103 185 68 / 89%)",
          color: "white",
          fontSize: "12px",
          textTransform: "capitalize",
          // width:"100%"
        }}
        onClick={(e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/view-service/${id}`);
        }}
      >
        View
      </Button>
    );
};

const columns = [
    {
        field: "application",
        headerName: "Application Number",
        minWidth: 90,
        flex: 1,
        type: "number",
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
   {
      field: "name",
      headerName: "Name",
      minWidth: 90,
      flex: 1,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "service",
      headerName: "Service",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "view",
      headerName: "View",
      minWidth: 150,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: detailsButton,
    }
];



const rows = data.map((row)=>{
    return{
        id:row.id,
        application:row.application,
        name:row.name,
        mobile:row.mobile,
        location:row.location,
        service:row.service,
        status:row.status
    }
})

  return (

    <Grid container sx={{justifyContent:"center",mt:2}}>
        <Typography variant='body1' fontSize="35px" fontWeight='600' textAlign={'center'}>
                Request Received
            </Typography>
        <Grid item sm={10}>
        <Box
        sx={{
          height: "430px",
          px: 2,
          "& .dataGridHeader": {
            color: "#CACACA",
            textAlign: "left",
          },
          "& .green": {
            backgroundColor: "#E7FFE9",
            color: "#41CF2A",
          },
          "& .yellow": {
            backgroundColor: "#FEFFC8",
            color: "#C5C05B",
          },
          "& .red": {
            backgroundColor: "#FFEBE7",
            color: "#CF482A",
          },
          "& .hold": {
            backgroundColor: "#CCCCCC",
            color: "#FFFFFF",
          },
          "& .statusCell": {
            maxHeight: "30px !important",
            minHeight: "25px !important",
            textAlign: "center !important",
            borderRadius: "10px !important",
            m: "auto",
            mx: 1,
          },
          "& .allCell": {
            justifyContent: "center !important",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          // checkboxSelection
          sx={{ color: "black !important", minWidth: "50px" }}
          getCellClassName={(parms) => {
            let cellClass = [];
            if (
              parms.field === "status" &&
              (parms.row.status === "Approved" ||
                parms.row.status === "Deposited")
            ) {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Pending")
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              parms.row.status === "Rejected"
            ){
              cellClass.push("red statusCell");
            }
            cellClass.push("allCell");

            return cellClass;
          }}
          // onSelectionModelChange={handleSelect}
        ></DataGrid>
      </Box>
        </Grid>
    </Grid>
  )
}

export default UserListing
