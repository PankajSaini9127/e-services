import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" top="0">
          <Toolbar>
            <Grid container sx={{justifyContent:"space-between"}}>
              <Typography>E-Services</Typography>

              <Box>
                <Typography>Contact Details</Typography>
                <Typography>Email: e-service@info.com</Typography>
                <Typography>Mobile: 6377455268</Typography>
                <Typography>
                  Address: MBM Engineering College Ratanada,Jodhpur
                </Typography>
              </Box>

            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Footer;
