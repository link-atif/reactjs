import React, { useEffect, useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles.scss";
import { Box, Typography, TextField } from "@material-ui/core";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";

import SearchResultTable from "./SearchResultTable";
import SearchBox from "../../components/common/SearchBox";

const Search = () => {
  const location = useLocation();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [loadingClass, setLoadingClass] = useState("");
  useEffect(() => {
    if (typeof location.search !== "undefined" && location.search !== "") {
      const { search } = location;
      const locSearch = new URLSearchParams(search);

      // GET VALUE FROM QUERY STRING
      let query = locSearch.get("query");
      if (typeof query !== "undefined") {
        const res = query.replace(/-/g, " ");
        setFilter(res);
      }
    }
  }, [location.search]);
  useEffect(() => {
    const applicationToken = window.localStorage.getItem("applicationToken");
    var headers = new Headers();
    headers.append("api-key", "B2F47FA3C717E9C51E54B16F23E81FBD");
    headers.append("Authorization", `Bearer ${applicationToken}`);
    headers.append("Access-Control-Allow-Origin", "*");
    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    if (typeof filter !== "undefined" && filter !== "") {
      setLoadingClass("data-loading");
      fetch(
        `https://roversdev.search.windows.net/indexes/claimpayment-index/docs?api-version=2020-06-30-Preview&search=${filter}&api-key=B2F47FA3C717E9C51E54B16F23E81FBD`,
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          setLoadingClass("");
          let { value } = json;
          setData(value);
        })
        .catch((err) => {
          setLoadingClass("");
          console.log("error is ", err);
        });
    }
  }, [filter]);
  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <SearchBox />
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main">
        <h2 className="page-heading">Search Results</h2>

        <div className="claim-new-lable">
          <ul className="navigation">
            <li>
              <NavLink
                to="/"
                activeClassName="active"
                style={{
                  backgroundColor: "#E2E5ED",
                  color: "#0C1015",
                }}
              >
                BACK
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="" color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="textPrimary">Search Results</Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        <SearchResultTable data={data} dataloadingClass={loadingClass} />

        <FooterCopyright />
      </Box>
    </>
  );
};

export default Search;
