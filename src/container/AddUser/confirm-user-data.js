

import React from 'react'
import PageHeader from '../../common/PageHeader'
import {Fade, Typography, Box, Grid, Button, TextField} from '@material-ui/core'
import { Formik, Form } from "formik"
import * as Yup from "yup"
import './styles.scss'
import {NavLink} from 'react-router-dom'

import {useSelector} from 'react-redux'
import {newUserStates} from '../../../redux/selectors'


const ConfirmUserData = () => {
  const handleReset = () => {
    console.log("Resetting");
  };

  const handleSubmit = (values, actions) => {
    console.log("submitting", values, actions);
  };

  const handleFormChange = (data) => {
    console.log(data.target.name, ' ', data.target.value);
  }
 
  const newUser = useSelector(newUserStates).newUserReducer;
  return (
    <Fade in>
      <div className="add-data-wrapper">
        <PageHeader title="Confirm New User Data" />

        <Box className="dashboard-content confirm-data">
          <NavLink  
            to="/dashboard/add-user" 
            className="MuiButtonBase-root 
            MuiButton-root 
            MuiButton-contained 
            MuiButton-containedPrimary 
            text-center 
            edit">
            Edit
          </NavLink>

          <Typography variant="h4">Set up the basics</Typography>
          <Typography>To Get Started, fill out some basic information about who you're adding as a user.</Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
              remember_in: "",
              radioGroup: "",
              checkboxGroup: [],
              singleCheckbox: false
            }}
            validationSchema={LoginFormSchema}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
            onReset={() => handleReset()}
            render={({
              values,
              errors,
              touched,
              isSubmitting,
              isValidating,
              submitCount,
              dirty,
              isValid,
              initialValues,
              validateOnChange,
              validateOnBlur
            }) => (
              <Form onChange={handleFormChange}>

                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <Box>
                      <TextField
                        label="First Name"
                        onChange={() => {}}
                        name="firstname"
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        value={newUser.firstname}
                        disabled
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item md={6}>
                    <Box>
                      <TextField
                        label="Last Name"
                        onChange={() => {}}
                        name="lastname"
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        value={newUser.lastname}
                        disabled
                      />
                    </Box>
                  </Grid>

                  <Grid item md={12}>
                    <Box>   
                      <TextField
                        label="Display Name"
                        onChange={() => {}}
                        name="displayName"
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={newUser.displayName}
                        disabled
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box>  
                      <TextField
                        label="Username"
                        onChange={() => {}}
                        name="username"
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={newUser.username}
                        disabled
                      />
                    </Box>
                  </Grid>

                  <Grid item md={6}>
                    <div className="with-left-icon">
                      <span>@</span>
                      <TextField
                        label="Domains"
                        onChange={() => {}}
                        name="domain"
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={newUser.domain}
                        disabled
                      />
                    </div>
                  </Grid>
                </Grid>
                
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <Box>  
                      <TextField
                        label="Password"
                        onChange={() => {}}
                        name="password"
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={newUser.password}
                        disabled
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box mt={3} className="text-right">
                  <Button 
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={() => {}}
                  >
                    Add User
                  </Button>
                </Box>
              </Form>
            )}
          />
        </Box>
      </div>
    </Fade>
  );
}

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),

  password: Yup.string()
    .min(8)
    .required(),
  remember_in: Yup.string().required("Required")
});

export default ConfirmUserData;
