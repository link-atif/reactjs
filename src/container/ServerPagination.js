import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Fade, Box, TextField } from "@material-ui/core";
import searchImg from "../assets/images/search.svg";
import UserDropdown from "./UserDropdown";

const columns = [
  {
    name: "Avatar",
    cell: (row) => (
      <img height="30px" width="30px" alt={row.first_name} src={row.avatar} />
    ),
  },
  {
    name: "First Name",
    selector: "first_name",
  },
  {
    name: "Last Name",
    selector: "last_name",
  },
  {
    name: "Email",
    selector: "email",
  },
];

function ServerPagination() {
  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 3;

  const getUserList = () => {
    axios
      .get(
        `https://reqres.in/api/users?page=${page}&per_page=${countPerPage}&delay=1`
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setUsers({});
      });
  };

  useEffect(() => {
    getUserList();
  }, [page]);

  return (
    <Fade in>
      <Box className="dashboard-main">
        <header className="dashboard-header">
          <h2>Employee List</h2>
          <div className="header-search-main">
            <div className="seach-form">
              <img src={searchImg} alt="Search" />
              <TextField
                id="standard-search"
                type="search"
                fullWidth
                className="mt-0"
              />
            </div>
            <UserDropdown />
          </div>
        </header>
        <div className="table-fluid claim-new-ui-main mt-5">
          <DataTable
            columns={columns}
            data={users.data}
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={users.total}
            paginationPerPage={countPerPage}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            onChangePage={(page) => setPage(page)}
          />
        </div>
      </Box>
    </Fade>
  );
}

export default ServerPagination;
