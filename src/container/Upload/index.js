import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import {
  Fade,
  Box,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  Button,
  LinearProgress,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import Messages from "./../../components/Messages";
import { RootContext } from "../../context/RootContext";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import { receiveMessages } from "./receive";
import { sendMessages } from "./send";
import SearchBox from "../../components/common/SearchBox";

const Upload = () => {
  const { setMessage } = useContext(RootContext);
  const [files, setFiles] = useState([]);
  const [loadingClass, setLoadingClass] = useState("");
  const [displayClass, setDisplayClass] = useState("none");
  const [queques, setQueques] = useState([
    "translation835",
    "translation277",
    "translation837",
  ]);
  const [quequeName, setQuequeName] = useState("translation835");
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    const files = e.target.files;
    const images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }
    setFiles(images);
  };
  useEffect(() => {
    // const notifications = await receiveMessages();
    setMessage({
      type: "",
      message: "",
    });
  }, []);
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleSubmit = async () => {
    var error = null;
    if (files == "") {
      error = { ...error, files: "File is required" };
      setErrors(error);
    }
    if (quequeName == "") {
      error = { ...error, quequeName: "Queque Name is required" };
      setErrors(error);
    }
    var data = [];
    await Promise.all(
      files.map(async (item) => {
        let encodedata = await convertBase64(item);
        data.push({
          name: item.name.substr(0, item.name.indexOf(".")),
          body: encodedata.replace("data:text/plain;base64,", ""),
        });
      })
    );
    setLoadingClass("loading");
    sendMessages(data, quequeName)
      .then((resposne) => {
        setLoadingClass("");
        setFiles("");
        setMessage({
          type: "success",
          message: "File Uploaded Successfully",
        });
      })
      .catch((error) => {
        setLoadingClass("loading");
        setMessage({
          type: "error",
          message: "Uploading Error",
        });
      });
    // setDisplayClass("");
    // common
    //   .fileUpload(files, (event) => {
    //     setProgress(Math.round((100 * event.loaded) / event.total));
    //   })
    //   .then((response) => {
    //     setDisplayClass("none");
    //     setMessage({
    //       type: "success",
    //       message: "File Uploaded Successfully",
    //     });
    //   })
    //   .catch((error) => {
    //     setDisplayClass("none");
    //     setProgress(0);
    //     setMessage({
    //       type: "error",
    //       message: "Uploading Error",
    //     });
    //   });
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
        <h2 className="page-heading">Uploads</h2>

        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="" color="inherit" href="/">
              Insights
            </Link>
            <Typography color="textPrimary">Data Sources</Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        <Box className="dr-upload-main">
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Messages />
              <Box className="dr-service-inner-nw">
                <Grid>
                  <Grid item md={12} className="ml-3">
                    <label className="new-input-lable">Queque Name</label>
                    <FormControl fullWidth>
                      <Box className="input-new-design-icon">
                        {/* <InputLabel id="demo-simple-select-label">
                          Queque Name
                      </InputLabel> */}
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          className="input-new-drop-st p-2"
                          fullWidth
                          value={quequeName}
                          onChange={(e) => setQuequeName(e.target.value)}
                        >
                          {queques.map((item) => {
                            return <MenuItem value={item}>{item}</MenuItem>;
                          })}
                        </Select>
                      </Box>
                    </FormControl>
                    <div className="text-danger">{errors.quequeName}</div>
                  </Grid>
                  <Grid item md={12} className="mt-3">
                    <Typography>
                      <input
                        accept="text/*"
                        className="upload-input"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="contained-button-file">
                        <IconButton
                          color="primary"
                          className="upload-input-icon"
                          component="span"
                        >
                          <CloudUploadIcon />
                        </IconButton>
                        Choose File{" "}
                        {files.length > 0
                          ? [
                              files.length > 1
                                ? files.length + " Selected"
                                : files[0].name,
                            ]
                          : ""}
                      </label>
                    </Typography>
                    <div className="text-danger">{errors.files}</div>
                  </Grid>
                </Grid>
              </Box>
              <Typography className="dr-service-links mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#0AE2B3",
                    padding: "10px 30px",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    textDecoration: "none",
                    float: "left",
                    boxShadow: "none",
                  }}
                  className={"custom-btn " + loadingClass}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <FooterCopyright />
      </Box>
    </>
  );
};

export default Upload;
