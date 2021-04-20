import React from "react";
import { Grid } from "@material-ui/core";

const Loading = ({ compHeight }) => {
  return (
    <Grid container>
      <Grid item md={12} className="text-center">
        <div style={{ height: "200px", width: "100%" }}></div>
      </Grid>
    </Grid>
  );
};

export default Loading;
