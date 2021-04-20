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
  TableSortLabel,
} from "@material-ui/core";
const TableWithFilters = ({ data, headers }) => {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    if (typeof data !== "undefined" && data !== null && data.length > 0) {
      const header = Object.keys(data[0]);

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
                  return (
                    <TableCell key={index}>
                      <TableSortLabel
                        active={item.order !== "#" ? true : false}
                        direction={item.order}
                        onClick={() =>
                          item.handleOrder(
                            item.order === "asc" ? "desc" : "asc"
                          )
                        }
                      >
                        {item.title}
                      </TableSortLabel>
                    </TableCell>
                  );
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

export default TableWithFilters;
