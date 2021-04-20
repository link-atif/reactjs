import React from "react";
import {
  Fade,
  Typography,
  Box,
  Grid,
  TextField,

  Button,

} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Messages from "../../../../components/Messages";

const UpdateAdminCode = ({
  handleSubmit,
  onChange,
  formData,
  update,
  loadingClass,
}) => {
  // console.log("UpdateAdminCode-compo-formData--->>", formData);
  return (
    <Fade in>
      <div className="add-user-layer ml-1">
        <Box>
          <Typography className="add-user-title" variant="h4">
            {!update ? "Add AdminCode" : "Update AdminCode"}
          </Typography>
          <br></br>
          <Grid container>
            <Grid item md={12}>
              <Messages />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Box className="add-user-input-outer">
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item xs={12}>
                    <TextField
                      label="CPTCode"
                      name="CPTCode"
                      autoComplete="off"
                      fullWidth
                      type="text"
                      value={formData.CPTCode}
                      onChange={onChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="add-user-input-outer">
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item xs={12}>
                    <TextField
                      label="Category"
                      onChange={onChange}
                      name="Category"
                      autoComplete="off"
                      fullWidth
                      type="text"
                      value={formData.Category}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="add-user-input-outer">
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item xs={12}>
                    <TextareaAutosize
                      fullWidth
                      aria-label="minimum height"
                      rowsMin={3}
                      placeholder="Description"
                      label="Description"
                      name="Description"
                      value={formData.Description}
                      onChange={onChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Box mt={3} className="text-right custom-add-btn">
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              color="primary"
              style={{ backgroundColor: "#67D091", color: "#ffffff" }}
              className={"custom-btn " + loadingClass}
            >
              {!update ? "Add AdminCode" : "Update AdminCode"}
            </Button>
          </Box>
        </Box>
      </div>
    </Fade>
  );
};

export default UpdateAdminCode;
