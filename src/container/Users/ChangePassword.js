import React, { useEffect,useState, useRef } from 'react'
import { Fade, Box, Typography, FormControl, Radio, RadioGroup, FormControlLabel,
  FormLabel, TextField, Button, Checkbox } from '@material-ui/core';
import PageHeader from '../../components/common/PageHeader'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import {RootContext} from '../../context/RootContext';
import UsersList from './UsersList'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Messages from '../../components/Messages';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const ChangePassword = ({selectedUser, handleChangePassword, handlePassword,handleAutoPassword,password,loadingClass,containsNumb,passLength,isUpperCase,btnStatus,passwordGenerator,randomPassword,speicalCharacter,errors}) => {  
  
  const [copySuccess, setCopySuccess] = useState('');
  const copyToClipboard = () => {
    let pass = randomPassword;
    navigator.clipboard.writeText(pass);
    setCopySuccess("Copied!");
  };

  return (
    <>
    <Messages />
    <Typography className="add-user-title" variant="h4">Reset Password</Typography>
    <Typography>{selectedUser.email}</Typography>
    <Box mt={3}>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Password Setting</FormLabel> */}
        <RadioGroup aria-label="position" name="passwordType" defaultValue="manual">
          <FormControlLabel 
            value="auto-generated" 
            control={<Radio color="primary" />} 
            label="Auto-generate password"
            onChange={handleAutoPassword}
          />
          <FormControlLabel 
            value="manual" 
            control={<Radio color="primary" />} 
            label="Let me create the password"
            onChange={handleAutoPassword}
          />
        </RadioGroup>
      </FormControl>
      <Box className="add-user-input-outer" pt={2}>
        {
        passwordGenerator!=false &&
        <TextField
          placeholder="Password"
          onChange={handlePassword}
          name="password"
          autoComplete="off"
          value={password}
          fullWidth
          type="password"
          disabled = {passwordGenerator != true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        }
        {
          password && password.length>0 &&
          <div className="password-instructions">
            <ul>
              <li className={passLength ? 'custom-messag-color' : 'text-danger'}>Contains more than 8 characters</li>
              <li className={speicalCharacter ? 'custom-messag-color' : 'text-danger'}>Password must contain speical character</li>
              <li className={containsNumb ? 'custom-messag-color' : 'text-danger'}>Contains numbers</li>
              <li className = {isUpperCase ? 'custom-messag-color' : 'text-danger'}>Contains Uppercase</li>
            </ul>
          </div>
          }

          {
          passwordGenerator!=true &&
          <div className="auto-generated-password">
            Password: <span>{randomPassword}</span>
            <FileCopyIcon onClick={copyToClipboard} />
            {copySuccess}
          </div>
          }
          {typeof errors !='undefined' && errors.password && (<div className="text-danger">
                        {errors.password}
                      </div>)}
      </Box>
      <Box className="custom-add-btn" pt={2}>
      <Button 
        variant="contained"
        color="primary"
        type="submit"
        style={{ backgroundColor: "#67D091", color: "#ffffff" }}
        className={"custom-btn " + loadingClass}
        onClick={handleChangePassword}
      >
        Update
      </Button>
      </Box>
    </Box>
    </>
  );
}
export default ChangePassword;