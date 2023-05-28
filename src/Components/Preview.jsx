import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobleContext } from "../App";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";

function Preview() {
  const {
    state: { preview },
  } = useContext(GlobleContext);

  const navigate = useNavigate();

  return (
    <>
      {/* <ReactToPrint
      trigger={()=><Button>Print</Button>}
      content={()=>componentRef}
      documentTitle='E-Services'
    /> */}
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sm={10} sx={{ mt: 8 }}>
          <Grid container>
            <DataFieldStyle
              field={"Application Number"}
              value={preview.application}
            />
            <DataFieldStyle field={"Name"} value={preview.name} />
            <DataFieldStyle field={"Father Name"} value={preview.fatherName} />
            <DataFieldStyle field={"Mother Name"} value={preview.motherName} />
            <DataFieldStyle field={"Mobile Number"} value={preview.mobile} />
            <DataFieldStyle field={"email"} value={preview.email} />
            <DataFieldStyle field={"time"} value={preview.timeslot} />
            <DataFieldStyle field={"location"} value={preview.location} />
            <DataFieldStyle field={"provider name"} value={preview.provider} />
            <DataFieldStyle field={"Service"} value={preview.service} />

            
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" m="auto">
              Note: Our Service Provider Reach To You In 30 Mints
            </Typography>
          </Grid>
        </Grid>

        <Grid item sm={3} sx={{ mt: 6 }}>
          <Button
            variant="contained"
            onClick={() => {
              window.print();
            }}
            fullWidth
            sx={{ height: "45px" }}
          >
            Print
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Preview;

const DataFieldStyle = ({ field, value, href, name, bold, cursor }) => {
  const typographyStyle = {
    textTransform: "capitalize",
    color: "var(--main-color)",
    fontWeight: "600",
    // "@media(max-width:900px)": { fontSize: "14px" },
  };

  return (
    <Grid item md={3} xs={6} sx={{ p: "0 !important", overflow: "auto" }}>
      <Typography variant="h6" sx={typographyStyle}>
        {" "}
        {field}
      </Typography>
      <Stack direction="column" gap={2}>
        <Typography
          variant="body2"
          sx={{ color: "black", cursor: cursor && "pointer" }}
          fontWeight={bold ? "600" : ""}
          flex={1}
        >
          {" "}
          {value}
        </Typography>
      </Stack>
    </Grid>
  );
};
