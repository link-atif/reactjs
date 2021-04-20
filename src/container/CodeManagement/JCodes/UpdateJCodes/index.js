import React from "react";
import {
  Fade,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Input,
} from "@material-ui/core";

import Messages from "../../../../components/Messages";

const UpdateJCode = ({
  handleSubmit,
  onChange,
  formData,
  update,
  loadingClass,
}) => {
  // console.log("UpdateJCode_formData--->>", formData);
  return (
    <Fade in>
      <div className="add-user-layer ml-1">
        <Box>
          <Typography className="add-user-title" variant="h4">
            {!update ? "Add JCode" : "Update JCode"}
          </Typography>
          <br></br>
          <Grid container>
            <Grid item md={12}>
              <Messages />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Box className="">
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item xs={12}>
                    <label className="new-input-lable">
                      Code
                      </label>
                    <Box className="input-new-design-icon">
                      <Input
                        placeholder="Code"
                        onChange={onChange}
                        name="Code"
                        autoComplete="off"
                        fullWidth
                        type="text"
                        value={formData.Code}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="">
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item xs={12}>
                    <label className="new-input-lable">
                      DrugName
                    </label>
                    <Box className="input-new-design-icon">
                      <Input
                        placeholder="DrugName"
                        onChange={onChange}
                        name="DrugName"
                        autoComplete="off"
                        fullWidth
                        type="text"
                        value={formData.DrugName}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="">
                <Grid container alignItems="flex-end">
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <label className="new-input-lable">
                        IsAncillary
                      </label>
                      <RadioGroup
                        row
                        name="isAncillary"
                        // value={`${formData.IsAncillary}`}
                        value={formData.isAncillary}
                        onChange={onChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="true"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="false"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="">
                <Grid container alignItems="flex-end">
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <label className="new-input-lable mb-0">
                        IsPreMed
                      </label>
                      <RadioGroup
                        row
                        name="isPreMed"
                        // value={`${formData.IsPreMed}`}
                        value={formData.isPreMed}
                        onChange={onChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="true"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="false"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="">
                <Grid container alignItems="flex-end">
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <label className="new-input-lable mb-0">
                        IsHormonal
                      </label>
                      <RadioGroup
                        row
                        name="isHormonal"
                        // value={`${formData.IsPreMed}`}
                        value={formData.isHormonal}
                        onChange={onChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="true"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="false"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="">
                <Grid container alignItems="flex-end">
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <label className="new-input-lable mb-0">
                        IsImmuno
                      </label>
                      <RadioGroup
                        row
                        name="isImmuno"
                        // value={`${formData.IsPreMed}`}
                        value={formData.isImmuno}
                        onChange={onChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="true"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="false"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="">
                <Grid container alignItems="flex-end">
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <label className="new-input-lable mb-0">
                        IsBiologics
                      </label>
                      <RadioGroup
                        row
                        name="isBiologics"
                        // value={`${formData.IsPreMed}`}
                        value={formData.isBiologics}
                        onChange={onChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="true"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="false"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="">
                <Grid container alignItems="flex-end">
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <label className="new-input-lable mb-0">
                        IsChemo
                      </label>
                      <RadioGroup
                        row
                        name="isChemo"
                        // value={`${formData.IsPreMed}`}
                        value={formData.isChemo}
                        onChange={onChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="true"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="false"
                        />
                      </RadioGroup>
                    </FormControl>
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
              className={"dr-success-btn " + loadingClass}
            >
              {!update ? "Add JCode" : "Update JCode"}
            </Button>
          </Box>
        </Box>
      </div>
    </Fade>
  );
};

export default UpdateJCode;
