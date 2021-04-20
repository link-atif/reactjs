import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import { Box, Grid, TextField, Drawer, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
// import Swal from "sweetalert2";

import CloseIcon from "@material-ui/icons/Close";
import { RootContext } from "../../context/RootContext";
import UsersList from "./UsersList";
import ChangePassword from "./ChangePassword";
import AddUser from "../AddUser";
import AddIcon from "@material-ui/icons/Add";

import { users } from "../../actions";
import ModalBoxCustom from "../../components/common/Modal/customModel";
import generatePassword from "../../services/Common";
import searchImg from "../../assets/images/search.svg";
import UserAdd from "../../assets/images/new-design/add-user.svg";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import SettingIcon from "../../assets/images/new-design/claims-icon/setting-icon.svg";
import ListIcon from "../../assets/images/new-design/claims-icon/list-icon.svg";
import CustomerIcon from "../../assets/images/new-design/claims-icon/customer-icon.svg";
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import CalendarIcon from "../../assets/images/new-design/claims-icon/calendar-icon.svg";
import FilterIcon from "../../assets/images/new-design/claims-icon/filter-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SearchBox from "../../components/common/SearchBox";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
const Users = () => {
  const { setMessage, subscriptionID, domainID, loginUserData } = useContext(
    RootContext
  );

  const [userListingData, setUserListingData] = useState({});
  const [userAllData, setUserAllData] = useState({});
  const [allRoles, setAllRoles] = useState({});
  const [rightDrawer, setRightDrawer] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [userRoles, setUserRoles] = useState("");
  const [passwordSetting, setPasswordSetting] = useState("");
  const [selectdRoles, setSelectdRoles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const [dataLoadingClass, setDataLoadingClass] = useState("");
  const [passwordGenerator, setPasswordGenerator] = useState(true);
  const [randomPassword, setRandomPassword] = useState(true);
  const [userStatus, setUserStatus] = useState(false);

  // set password
  const [pass, setPass] = useState("");
  const [passLength, setPassLength] = useState(false);
  const [containsNumb, setContainsNumb] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [speicalCharacter, setSpeicalCharacter] = useState(false);

  const [errors, setErrors] = useState({});
  const [mfaChoice, setMfaChoice] = useState("email");

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

  let btnStatus = passLength && containsNumb && isUpperCase ? false : true;

  // const notificationsArr = [
  //   { listItem: "Multi-factor authentication", icon: <LockOpenIcon /> },
  //   { listItem: "Delete a user", icon: <DeleteOutlineOutlinedIcon /> },
  //   { listItem: "Refresh", icon: <RefreshOutlinedIcon /> },
  //   { listItem: "Export Users", icon: <ImportExportOutlinedIcon /> },
  //   { listItem: "Reset a password", icon: <VpnKeyOutlinedIcon /> },
  //   { listItem: "Directory synchronization", icon: <CachedOutlinedIcon /> },
  // ];

  const onEdit = (data) => {
    const index = userAllData.findIndex((user) => user.userId == data.id);
    if (index != -1) {
      setSelectedUser(userAllData[index]);
      setFirstName(userAllData[index].firstname);
      setLastName(userAllData[index].lastname);
      setEmail(userAllData[index].email);
      setContactNo(userAllData[index].contactNo);
      setDisplayName(userAllData[index].displayName);
      setUserStatus(userAllData[index].isActive);
      setAddUser(true);
      if (
        typeof userAllData[index].mfaDeliverChoice !== "undefined" &&
        userAllData[index].mfaDeliverChoice !== ""
      ) {
        setMfaChoice(userAllData[index].mfaDeliverChoice);
      }
      const roles = userAllData[index].roles.map((item, index) => {
        return item.roleId;
      });
      setSelectdRoles(roles);
    }
  };

  const onChangePassword = (data) => {
    const index = userAllData.findIndex((user) => user.userId === data.id);
    if (index !== -1) {
      setMessage({
        type: "",
        message: "",
      });
      setSelectedUser(userAllData[index]);
      setRightDrawer(true);
    }
  };

  const handleChangePassword = () => {
    if (selectedUser.userId) {
      let body = {};
      if (passwordGenerator === false) {
        body = {
          id: selectedUser.userId,
          password: randomPassword,
          email: selectedUser.email,
        };
      } else {
        if (!password.match(passw)) {
          let errors = { password: "Please Enter correct Password" };
          setErrors(errors);
          return false;
        }
        body = {
          id: selectedUser.userId,
          password: password,
          email: selectedUser.email,
        };
      }
      setLoadingClass("loading");
      users
        .changePassword(body)
        .then((response) => {
          if (response.data.success === true) {
            setLoadingClass("");
            setPassword("");
            setPasswordGenerator(true);
            setRandomPassword(false);
            setMessage({
              type: "success",
              message: response.data.message,
              interval: 9000,
            });
            setTimeout(function () {
              setRightDrawer(false);
              getAllUsersListing();
            }, 2000);
          } else {
            setLoadingClass("");
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
    }
  };

  const handleNameChange = () => {
    setFirstName(selectedUser.firstName);
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSave();
    }
  };
  const setStatus = (e) => {
    if (userStatus === false) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  };
  const handleSave = () => {
    let userRoles = [];
    if (selectdRoles.length > 0) {
      for (var i = 0; i < selectdRoles.length; i++) {
        userRoles.push({ roleId: selectdRoles[i] });
      }
    }
    if (passwordGenerator === false) {
      setPassword(generatePassword(8));
    }
    if (selectedUser.userId) {
      const body = {
        userId: selectedUser.userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        contactNo: contactNo,
        displayname: displayName,
        roles: userRoles,
        isActive: userStatus,
        mfaDeliverChoice: mfaChoice,
        // Subscriptions: subscriptionID,
        Subscriptions: [{ subscriptionId: subscriptionID }],
        domainID: domainID,
      };
      // console.log('requested body is',body);return false;
      setLoadingClass("loading");
      users
        .updateUser(body)
        .then((response) => {
          setLoadingClass("");
          if (response.data.success === true) {
            setMessage({
              type: "success",
              message: response.data.message,
            });
            getAllUsersListing();
            setFirstName("");
            setLastName("");
            setEmail("");
            setContactNo("");
            setDisplayName("");
            getAllUsersListing();
            setSelectedUser({});
            setAddUser(false);
            setSelectdRoles([]);
          } else {
            setMessage({
              type: "error",
              message: response.data.message,
              interval: 9000,
            });
          }
        })
        .catch((error) => {
          setLoadingClass("");
          console.log(error.response.data);
          setMessage({
            type: "error",
            message: error.response.data.message,
            interval: 9000,
          });
          console.log(error.response.data.status);
        });
    } else {
      let body = {};
      if (passwordGenerator === false) {
        body = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          contactNo: contactNo,
          displayname: displayName,
          password: randomPassword,
          roles: userRoles,
          Subscriptions: subscriptionID,
          domainID: domainID,
          mfaDeliverChoice: mfaChoice,
        };
      } else {
        var error = null;
        if (typeof firstName === "undefined" || firstName === "") {
          error = { ...error, firstName: "First Name is required" };
        }
        if (typeof lastName === "undefined" || lastName === "") {
          error = { ...error, lastName: "Last Name is required" };
        }
        if (typeof email === "undefined" || email === "") {
          error = { ...error, email: "Email is required" };
        }
        if (typeof contactNo === "undefined" || contactNo === "") {
          error = { ...error, contactNo: "Contact NO is required" };
        }
        if (!password.match(passw)) {
          error = { ...error, password: "Please Enter correct Password" };
        }
        if (error != null) {
          setErrors(error);
          return false;
        }
        body = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          contactNo: contactNo,
          displayname: displayName,
          password: password,
          roles: userRoles,
          mfaDeliverChoice: mfaChoice,
          Subscriptions: subscriptionID,
          domainID: domainID,
        };
      }
      setLoadingClass("loading");
      users
        .createUser(body)
        .then((response) => {
          setLoadingClass("");
          if (response.data.success === true) {
            setMessage({
              type: "success",
              message: response.data.message,
              interval: 9000,
            });
            setFirstName("");
            setLastName("");
            setEmail("");
            setContactNo("");
            setDisplayName("");
            getAllUsersListing();
            setSelectedUser({});
            setAddUser(false);
            setSelectdRoles([]);
            setPasswordGenerator(true);
            setRandomPassword(false);
            setPassword("");
          } else {
            setMessage({
              type: "error",
              message: response.data.message,
              interval: 9000,
            });
            setRandomPassword(false);
            setPasswordGenerator(true);
          }
        })
        .catch((error) => {
          setLoadingClass("");
          console.log(error.response.data);
          setMessage({
            type: "error",
            message: error.response.data.message,
            interval: 9000,
          });
          console.log(error.response.data.status);
        });
    }
  };

  const openDeleteModal = (data) => {
    const loginUser = JSON.parse(loginUserData);

    if (loginUser.userId === data.id) {
      // Swal.fire({
      //   icon: 'error',
      //   text: 'Can not delete logged in user',
      // })

      return;
    }

    setMessage({
      type: "",
      message: "",
    });
    setDeleteData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    setMessage({
      type: "",
      message: "",
    });
    setLoadingClass("loading");
    console.log(deleteData);
    users
      .deleteUser(deleteData.email)
      .then((response) => {
        if (response.data.success === true) {
          setOpen(false);
          setLoadingClass("");
          setMessage({
            type: "success",
            message: response.data.message,
          });
          let newUsers = userListingData.filter(user => user.email !== deleteData.email);
          setUserListingData(newUsers);
          // getAllUsersListing();
        } else {
          setLoadingClass("");
          setMessage({
            type: "error",
            message: response.data.message,
          });
        }
      })
      .catch((error) => {
        setLoadingClass("");
        setOpen(false);
        setMessage({
          type: "error",
          message: error.response.data.message,
        });
      });
  };

  const getAllUsersListing = () => {
    setDataLoadingClass("data-loading");
    users.getAllUsers(domainID).then((response) => {
      setUserAllData(response.data.data);
      setDataLoadingClass("");
      const data = response.data.data;
      if (typeof data != "undefined" && data != null && data.length > 0) {
        const userListingData = data.map((item, index) => {
          return {
            id: item.userId,
            firstname: item.firstName,
            lastname: item.lastName,
            email: item.email,
            displayName: item.displayName,
            roles: item.roles,
          };
        });
        setUserListingData(userListingData);
      }
    });
  };

  const getAllRoles = () => {
    users.getAllRoles().then((response) => {
      setAllRoles(response.data.data);
    });
  };

  useEffect(() => {
    getAllRoles();
    getAllUsersListing();
    setMessage({
      type: "",
      message: "",
    });
  }, []);

  useEffect(() => {
    setFirstName(selectedUser.firstName);
    setLastName(selectedUser.lastName);
    setEmail(selectedUser.email);
    setDisplayName(selectedUser.displayName);
  }, [selectedUser]);

  const updateDisplayName = () => {
    setDisplayName(firstName + " " + lastName);
  };

  const closeUser = () => {
    setAddUser(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDisplayName("");
    getAllUsersListing();
    setSelectedUser({});
    setPasswordGenerator(true);
    setRandomPassword(false);
  };

  const handleAutoPassword = (e) => {
    setPassword("");
    if (e.target.value === "manual") {
      setPasswordGenerator(true);
    } else {
      setRandomPassword(generatePassword(8));
      setPasswordGenerator(false);
    }
  };

  const modalDataObj = {
    title: "Confirm Delete!",
    description: "Are you sure you want to delete this user ?",
  };
  const selectUserRoles = (id) => {
    let dummyData = [...selectdRoles];
    let selectdId = dummyData.findIndex((item) => item === id);
    if (selectdId === -1) {
      dummyData.push(id);
      setSelectdRoles(dummyData);
    } else {
      dummyData = dummyData.filter((item) => item !== id);
      setSelectdRoles(dummyData);
    }
  };
  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <SearchBox />

          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main">
        <div>
          <h2 className="page-heading">User List</h2>

          <BootstrapTooltip title="SETTING">
            <div className="filter-hamburger pull-right">
              <img src={SettingIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="ITEMS">
            <div className="filter-hamburger pull-right mr-3">
              <img src={ListIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="CUSTOMER">
            <div className="filter-hamburger pull-right mr-3">
              <img src={CustomerIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="PRINT">
            <div className="filter-hamburger pull-right mr-3">
              <img src={PrintIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="EXPORT">
            <div className="filter-hamburger pull-right mr-3">
              <img src={ExportIcon} alt="icon" />
            </div>
          </BootstrapTooltip>

          {/* Breadcrumbs */}
          <Box className="breadcreams-new">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="" color="inherit" href="/">
                Insights
              </Link>
              <Typography color="textPrimary">User List</Typography>
              <NavLink
                to="#"
                className="new-coman-btn ml-3"
                onClick={() => setAddUser(true)}
              >
                <img src={UserAdd} alt="Icon" /> Add User
              </NavLink>
            </Breadcrumbs>
          </Box>

          {/*End Breadcrumbs */}
        </div>

        <div className="mt-3">
          <Grid container>
            <Grid item xs={12}>
              <UsersList
                userListing={userListingData}
                onChangePassword={onChangePassword}
                handleEdit={onEdit}
                handleDelete={openDeleteModal}
                dataLoadingClass={dataLoadingClass}
              />
            </Grid>
          </Grid>

          <ModalBoxCustom
            modalData={modalDataObj}
            handleConfirm={onDelete}
            open={open}
            handleClose={handleClose}
            size="sm"
            action={true}
            loadingClass={loadingClass}
          />
        </div>
        <Drawer anchor={"right"} open={addUser}>
          <div className="add-user-overlay">
            <CloseIcon className="close" onClick={closeUser} />
            <AddUser
              firstName={firstName}
              lastName={lastName}
              displayName={displayName}
              email={email}
              contactNo={contactNo}
              password={password}
              updateDisplayName={updateDisplayName}
              handleSave={handleSave}
              handleFirstName={(e) => setFirstName(e.target.value)}
              handleLastName={(e) => setLastName(e.target.value)}
              handleEmail={(e) => setEmail(e.target.value)}
              handleContact={(e) => setContactNo(e.target.value)}
              handleDisplayName={(e) => setDisplayName(e.target.value)}
              handlePassword={(e) => handlePasswordChange(e)}
              handleAutoPassword={(e) => handleAutoPassword(e)}
              selectedUser={selectedUser}
              handleNameChange={handleNameChange}
              allRoles={allRoles}
              selectUserRoles={selectUserRoles}
              selectdRoles={selectdRoles}
              loadingClass={loadingClass}
              passwordGenerator={passwordGenerator}
              containsNumb={containsNumb}
              passLength={passLength}
              isUpperCase={isUpperCase}
              btnStatus={btnStatus}
              randomPassword={randomPassword}
              speicalCharacter={speicalCharacter}
              handleKeyPress={handleKeyPress}
              errors={errors}
              userStatus={userStatus}
              setStatus={setStatus}
              mfaChoice={mfaChoice}
              handleMfaChoice={(e) => setMfaChoice(e.target.value)}
            />
          </div>
        </Drawer>
        <Drawer anchor={"right"} open={rightDrawer}>
          <div className="add-user-overlay">
            <CloseIcon
              className="close"
              onClick={() => setRightDrawer(false)}
            />
            <ChangePassword
              password={password}
              selectedUser={selectedUser}
              handlePassword={(e) => handlePasswordChange(e)}
              handleAutoPassword={(e) => handleAutoPassword(e)}
              handleChangePassword={handleChangePassword}
              handleEdit={onEdit}
              handleDelete={onDelete}
              loadingClass={loadingClass}
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
        </Drawer>

        <FooterCopyright />
      </Box>
    </>
  );
};

export default Users;
