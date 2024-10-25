import React, { useState } from "react";
import { StyledTableCell, StyledTableRow } from "./styles";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";

const TableViewTemplate = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column, index) => (
                <StyledTableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={index} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableViewTemplate;
