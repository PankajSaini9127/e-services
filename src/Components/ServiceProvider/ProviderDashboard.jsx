import { Grid, Typography } from "@mui/material";
import React from "react";

function ProviderDashboard() {
  return (
    <>
      <Grid container sx={{ justifyContent: "space-evenly", mt: 6 }}>
        <Grid item md={10} container spacing={4}>
          <DashBoardItem />
          <DashBoardItem />
          <DashBoardItem />
        </Grid>
      </Grid>
    </>
  );
}

function DashBoardItem() {
  return (
    <Grid item md={4} xs={6} container sx={{ justifyContent: "space-evenly" }}>
      <Grid
        container
        sx={{
          height: "181px",
          width: "100%",
          backgroundColor: "var(--main-color)",
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.25);",
          "@media(max-width:900px)": { height: "130px" },
        }}
      >
        <Grid item>
          <Typography
            variant="body1"
            fontSize="60px"
            color="white"
            textAlign="center"
            fontWeight="600"
            lineHeight="65px"
            sx={{
              "@media(max-width:900px)": {
                fontSize: "35px",
                lineHeight: "50px",
              },
            }}
          >
            {"10"}
          </Typography>
          <Typography
            variant="body1"
            fontSize="18px"
            color="white"
            textAlign="center"
            mt="-10px"
            sx={{ "@media(max-width:900px)": { fontSize: "11px" } }}
          >
            {"Total Request"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProviderDashboard;
