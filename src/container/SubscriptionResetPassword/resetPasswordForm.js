import React, { useEffect, useState, useRef } from 'react'
import {
    Fade, Box, Typography, FormControl, Radio, RadioGroup, FormControlLabel,
    FormLabel, TextField, Button, Checkbox
} from '@material-ui/core';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import Messages from '../../components/Messages';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

const ResetPasswordForm = ({ selectedUser, email, handleChangeEmail, handleChangePassword, handlePassword, handleAutoPassword, password, loadingClass, containsNumb, passLength, isUpperCase, btnStatus, passwordGenerator, randomPassword, speicalCharacter, errors }) => {

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
            {/* <Typography>{selectedUser.email}</Typography> */}
            <Box mt={3}>
                <Box className="add-user-input-outer" pt={2}>
                    {
                        <TextField
                            placeholder="Email"
                            onChange={handleChangeEmail}
                            name="email"
                            autoComplete="off"
                            value={email}
                            fullWidth
                            type="text"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    }
                    {typeof errors != 'undefined' && errors.email && (<div className="text-danger">
                        {errors.email}
                    </div>)}
                </Box>
                <Box className="add-user-input-outer" pt={2}>
                    {
                        passwordGenerator != false &&
                        <TextField
                            placeholder="Password"
                            onChange={handlePassword}
                            name="password"
                            autoComplete="off"
                            value={password}
                            fullWidth
                            type="password"
                            disabled={passwordGenerator != true}
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
                        password && password.length > 0 &&
                        <div className="password-instructions">
                            <ul>
                                <li className={passLength ? 'custom-messag-color' : 'text-danger'}>Contains more than 8 characters</li>
                                <li className={speicalCharacter ? 'custom-messag-color' : 'text-danger'}>Password must contain speical character</li>
                                <li className={containsNumb ? 'custom-messag-color' : 'text-danger'}>Contains numbers</li>
                                <li className={isUpperCase ? 'custom-messag-color' : 'text-danger'}>Contains Uppercase</li>
                            </ul>
                        </div>
                    }

                    {
                        passwordGenerator != true &&
                        <div className="auto-generated-password">
                            Password: <span>{randomPassword}</span>
                            <FileCopyIcon onClick={copyToClipboard} />
                            {copySuccess}
                        </div>
                    }
                    {typeof errors != 'undefined' && errors.password && (<div className="text-danger">
                        {errors.password}
                    </div>)}
                </Box>
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
                <Box className="custom-add-btn" pt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ backgroundColor: "#67D091", color: "#ffffff" }}
                        className={"custom-btn " + loadingClass}
                        onClick={handleChangePassword}
                    >
                        Send
             </Button>
                </Box>
            </Box>
        </>
    );
}
export default ResetPasswordForm;