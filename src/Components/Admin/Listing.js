import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobleContext } from "../../App";
import { setAlert } from "../ContextAPI/Action";
import { get_all_service, get_all_user } from "../../Services/Service";
import SignUp from "../SignUp";

function Listing() {
  const navigate = useNavigate();

  const { dispatch, state } = useContext(GlobleContext);

  const [signUpPopUp, setSignUp] = useState(false);

  const [data, setData] = useState([]);
  console.log(data);

  async function fetchData() {
    try {
      const response = await get_all_user();
      console.log(response);
      if (response.data.success) {
        setData(response.data.users);
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong Please Try Again Later.",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong Please Try Again Later.",
        })
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      field: "email",
      headerName: "Email",
      minWidth: 160,
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
      mobile: row.mobile,
      location: row.location,
      email: row.email,
    };
  });

  return (
    <Grid container sx={{ justifyContent: "center", mt: 2 }}>
      <SignUp open={signUpPopUp} setSignUp={setSignUp} />

      <Grid item xs={12}>
        <Typography
          variant="body1"
          fontSize="35px"
          fontWeight="600"
          textAlign={"center"}
        >
          E-Servises Provider
        </Typography>
        <Button
          sx={{ float: "right", mr: 6, my: 3 }}
          onClick={() => setSignUp(true)}
          variant="contained"
        >
          Add Agent
        </Button>
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
            // onSelectionModelChange={handleSelect}
          ></DataGrid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Listing;
