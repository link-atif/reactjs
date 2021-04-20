import React, { useEffect, useState, useContext } from "react";
import {
    Box,
    TextField,
    Card,
    CardContent,
    makeStyles,
} from "@material-ui/core";

import generatePassword from "../../services/Common";
import users from '../../actions/user';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { RootContext } from "../../context/RootContext";
import Messages from "../../components/Messages";
import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import ResetPasswordForm from "./resetPasswordForm";




const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const UsersProfileChangePassword = () => {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [passwordGenerator, setPasswordGenerator] = useState(true);
    const [email, setEmail] = useState("");
    const [containsNumb, setContainsNumb] = useState(false);
    const [passLength, setPassLength] = useState(false);
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [speicalCharacter, setSpeicalCharacter] = useState(false);
    const [randomPassword, setRandomPassword] = useState(true);
    const [errors, setErrors] = useState({});
    const { userToken, setMessage, loginUserData } = useContext(
        RootContext
    );

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    // check for numbers
    const checkNumbers = (str) => {
        let matches = str.match(/\d+/g);
        setContainsNumb(matches != null ? true : false);
    };

    // check for upper case
    const checkForUpperCase = (str) => {
        let matches = str.match(/[A-Z]/);
        setIsUpperCase(matches != null ? true : false);
    };

    const checkSpeicalCharacter = (str) => {
        let matches = str.match(/[^A-Z a-z0-9]/);
        setSpeicalCharacter(matches != null ? true : false);
    };
    // handle password change
    const handlePasswordChange = (e) => {
        let targetValue = e.target.value;
        setErrors({});
        setPassword(targetValue);
        if (targetValue.length === 0) {
            setPassLength(false);
            setContainsNumb(false);
            setIsUpperCase(false);
            setSpeicalCharacter(false);
        } else {
            setPassLength(targetValue.length > 7 ? true : false);
            checkNumbers(targetValue);
            checkForUpperCase(targetValue);
            checkSpeicalCharacter(targetValue);
        }
    };

    useEffect(() => {
        if (errors.email) {
            setErrors({})
        }
    }, [email])

    const handleAutoPassword = (e) => {
        setPassword("");
        if (e.target.value === "manual") {
            setPasswordGenerator(true);
        } else {
            setRandomPassword(generatePassword(8));
            setPasswordGenerator(false);
        }
    };

    const handleChangePassword = () => {

        let body = {};

        if (!email.match(emailRegex)) {
            let errors = { email: "Please Enter valid Email" };
            setErrors(errors);
            return false;
        }

        if (passwordGenerator === false) {
            body = {
                password: randomPassword,
                email: email,
            };
        } else {
            if (!password.match(passw)) {
                let errors = { password: "Please Enter correct Password" };
                setErrors(errors);
                return false;
            }
            body = {
                password: password,
                email: email,
            };
        }
        // setLoadingClass("loading");
        users
            .adminResetPassword(body)
            .then((response) => {
                if (response.data.success === true) {
                    // setLoadingClass("");
                    setPassword("");
                    setPasswordGenerator(true);
                    setRandomPassword(false);
                    setEmail("");
                    setMessage({
                        type: "success",
                        message: response.data.message,
                        interval: 9000,
                    });
                } else {
                    // setLoadingClass("");
                    setMessage({
                        type: "error",
                        message: response.data.message,
                        interval: 9000,
                    });
                }
            })
            .catch((error) => {
                setMessage({
                    type: "error",
                    message: error.response.data.message,
                    interval: 9000,
                });
            });
    };

    let btnStatus = passLength && containsNumb && isUpperCase ? false : true;

    return (
        <>
            <header className="dashboard-header header-new">
                <div className="header-search-main">
                    <div className="seach-form">
                        <img src={searchImg} alt="Search" />
                        <TextField
                            id="standard-search"
                            placeholder="Search"
                            type="search"
                            className="mt-0"
                        />
                    </div>
                    <UserDropdown />
                </div>
            </header>
            <Box className="dashboard-main">
                <h2 className="page-heading">Reset Password</h2>

                {/* Breadcrumbs */}
                <Box>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link className="f-14" color="inherit" href="/dr-services">
                            Home
            </Link>
                        <Typography className="f-14" color="textPrimary">
                            Reset Password
            </Typography>
                    </Breadcrumbs>
                </Box>
                {/*End Breadcrumbs */}

                <div className="dashboard-content">
                    <Card className="mt-4">
                        <CardContent>
                            <Messages />
                            <div className="password-section add-data-wrapper mx-3 p-5" >
                                <ResetPasswordForm
                                    password={password}
                                    // selectedUser={selectedUser}
                                    handlePassword={(e) => handlePasswordChange(e)}
                                    handleAutoPassword={(e) => handleAutoPassword(e)}
                                    handleChangePassword={handleChangePassword}
                                    handleChangeEmail={(e) => { setEmail(e.target.value) }}
                                    email={email}
                                    // handleEdit={onEdit}
                                    // handleDelete={onDelete}
                                    // loadingClass={loadingClass}
                                    passwordGenerator={passwordGenerator}
                                    containsNumb={containsNumb}
                                    passLength={passLength}
                                    isUpperCase={isUpperCase}
                                    speicalCharacter={speicalCharacter}
                                    btnStatus={btnStatus}
                                    randomPassword={randomPassword}
                                    errors={errors}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <FooterCopyright />
            </Box>
        </>
    );
};

export default UsersProfileChangePassword;
