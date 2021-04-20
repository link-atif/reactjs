import React, {useContext, useState, useEffect} from 'react'
import {Button, Grid, TextField, Box} from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import './styles.scss'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {InputLabel, MenuItem, FormControl, Select, Radio, RadioGroup, FormControlLabel, FormLabel, Checkbox} from '@material-ui/core'
import {RootContext} from '../../../context/RootContext';
import { Redirect, useHistory } from 'react-router-dom';
import {common,users} from '../../../actions'


const EditProfile = () => {

  const {userRegister, setUserRegister} = useContext(RootContext);
  const history = useHistory();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [organization, setOrganization] = useState('');
  const [domain, setDomain] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [defaultCity, setDefaultCity] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState({});
  const {userToken,setUserToken, setMessage, permission, setPermission,loginUserData,setLoginUserData,userName, setUserName} = useContext(RootContext);
  const [userRow,setUserRow] = useState({});
  const [loadingClass, setLoadingClass] = useState('');
  let user = {};

  const getProfile = () => {
    user = JSON.parse(loginUserData);
    setUserRow(user);
    users.getUser(user.email)
    .then(response => {
      const data = response.data.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDisplayName(data.displayName);
      setEmail(data.email);
      setUserRow(data);
    })
  }

  const updateDisplayName = () => {
    setDisplayName(firstName+" "+lastName)
  }

  useEffect(() => {
    getProfile();
  },[]);

  const updateUser = () => {
    
    var error = null;
    if(firstName==''){
      error = {...error, firstname: 'Firstname is required' };
      setErrors(error)
    } 
    if(lastName==''){
      error = {...error, lastname: 'Lastname is required' };
      setErrors(error)
    }

    if(displayName==''){
      error = {...error, displayName: 'Display Name is required' };
      setErrors(error)
    }

    if(email==''){
      error = {...error, email: 'Email is required' };
      setErrors(error)
    }

    if(error==null){
      user = JSON.parse(loginUserData);
      setUserRow(user);
      let userRoles = [];
      if(user.roles.length>0){
        for(var i=0; i<user.roles.length; i++){
          userRoles.push({"roleId":user.roles[i].roleId});
        }
      }
      setLoadingClass('loading');
      const body = {id:user.userId,firstname:firstName,lastname:lastName,email:email,displayname:displayName,roles:userRoles}
      users.updateUser(body)
      .then(response => {
        setLoadingClass('');
        if(response.data.success==true){
          setMessage({
            type:'success',
            message:response.data.message
          });
          getProfile();
        }else{
          setMessage({
            type:'error',
            message:response.data.message
          });
        }
      })
      .catch((error) => {
        setLoadingClass('');
        console.log(error.response.data);
        setMessage({
          type:'error',
          message:error.response.data.message
        });
        console.log(error.response.data.status);
      });
    }
  }

  const updateDomain = (e) =>{
    const email_array = email.split('@');
    setDomain(email_array[1]);
  }


  return (
    <div>
      <div className="page-header">
          <h1>Edit Profile</h1>
      </div>
      <div className="dashboard-content">
        <div className="edit-profile-wrapper">
            <div class="profile-wrapper">
              <div className="edit-img">
                <AddAPhotoIcon />
                <TextField
                  type="file"
                  name=""
                  onChange={e => {console.log(e.target.value)}}
                />
              </div>
              <div className="profile-dp"></div>
              <div className="title-edit">
                <input type="text" defaultValue={userRow.displayName} />
              </div>
            </div>
            <br />
            <h2>About</h2>

            <Grid container spacing={4}>
            <Grid item md={6}>
                <Box>  
                  <TextField
                    type="text"
                    label="First Name"
                    name=""
                    value={firstName}
                    onChange={(e)=> setFirstName(e.target.value)}
                    onBlur={updateDisplayName}
                    variant="outlined"
                    fullWidth
                  />
                  <div className="error-message">{errors.firstname}</div>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box>
                  <TextField
                    type="text"
                    label="Last Name"
                    name=""
                    value={lastName}
                    onChange={(e)=> setLastName(e.target.value)}
                    variant="outlined"
                    onBlur={updateDisplayName}
                    fullWidth
                  />
                  <div className="error-message">{errors.lastname}</div>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box>  
                  <TextField
                    type="text"
                    label="First Name"
                    name=""
                    value={firstName}
                    onChange={(e)=> setFirstName(e.target.value)}
                    onBlur={updateDisplayName}
                    variant="outlined"
                    fullWidth
                  />
                  <div className="error-message">{errors.firstname}</div>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box>
                  <TextField
                    type="text"
                    label="Last Name"
                    name=""
                    value={lastName}
                    onChange={(e)=> setLastName(e.target.value)}
                    variant="outlined"
                    onBlur={updateDisplayName}
                    fullWidth
                  />
                  <div className="error-message">{errors.lastname}</div>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item md={6}>
                <Box>
                  <TextField
                    type="text"
                    label="Display Name"
                    value={displayName}
                    onChange={e => {console.log(e.target.value)}}
                    variant="outlined"
                    fullWidth
                  />
                  <div className="error-message">{errors.displayName}</div>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box>
                  <TextField
                    type="text"
                    label="Email"
                    name=""
                    value={email}
                    onChange={e => {console.log(e.target.value)}}
                    variant="outlined"
                    fullWidth
                    disabled = "true"
                  />
                </Box>
                <div className="error-message">{errors.email}</div>
              </Grid>
            </Grid>            
            <Box mt={5} mb={5} className="text-center">
              <Button 
                variant="contained"
                color="primary"
                type="submit"
                onClick={updateUser}
                className={"btn-primary " + loadingClass}
              >
                Update Profile
              </Button>
            </Box>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;