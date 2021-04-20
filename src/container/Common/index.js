import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
const CommonTable = ({ data }) => {
  const [headers, setHeaders] = useState([]);
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    if (typeof data !== "undefined" && data !== null && data.length > 0) {
      const header = Object.keys(data[0]);
      setHeaders(header);
      setDataList(data);
    }
  }, [data]);
  return (
    <React.Fragment>
      {data.length > 0 ? (
        <TableContainer
          component={Paper}
          className="detail-table-service-line-new tb-scroll"
        >
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((item, index) => {
                  return <TableCell key={index}>{item}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((item) => {
                let dataItems = Object.values(item);
                return (
                  <TableRow>
                    {dataItems.map((col, index) => {
                      return <TableCell key={index}>{col}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
          <div>No data Found</div>
        )}
    </React.Fragment>
  );
};

export default CommonTable;
