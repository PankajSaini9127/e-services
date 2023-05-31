import { Box, Button, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { get_all_contact_query } from '../Services/Service';

export default function ListContactQuery() {

  const [data, setData] =  useState([])

  async function fetchData(){
    try {
      const response = await get_all_contact_query()
      if(response.data.success){
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
     fetchData()
  },[])

  const columns = [
    {
      field: "sr",
      headerName: "Sr",
      minWidth: 10,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 90,
      flex: 1,
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
      field: "email",
      headerName: "Email",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "message",
      headerName: "MEssage",
      minWidth: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    
  ];

  const rows = data.map((row, i) => {
    return {
      id: row.id,
      sr: i + 1,
      name: row.name,
      mobile: row.phone,
      location: row.location,
      email: row.email,
      message:row.message
    };
  });



  return (
    <Grid container sx={{ justifyContent: "center", mt: 2 }}>

    <Grid item xs={12}>
      <Typography
        variant="body1"
        fontSize="35px"
        fontWeight="600"
        textAlign={"center"}
      >
        Customber Query
      </Typography>
      {/* <Button
        sx={{ float: "right", mr: 6, my: 3 }}
        onClick={() => setSignUp(true)}
        variant="contained"
      >
        Add Agent
      </Button> */}
    </Grid>

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
              parms.row.status === "Pending"
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              parms.row.status === "Rejected"
            ) {
              cellClass.push("red statusCell");
            }
            cellClass.push("allCell");

            return cellClass;
          }}
        ></DataGrid>
      </Box>
    </Grid>
  </Grid>
  )
}
