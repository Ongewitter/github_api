import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CommitsTable({ commits }) {
  if (commits.length <= 0) { return '' };

  function renderCommits() {
    return commits.map(commit => {
      return (
        <TableRow
          key={`commit-` + commit.sha}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>
            <a href={commit.html_url}>{commit.sha}</a>
          </TableCell>
          <TableCell>{commit.commit.author.name}</TableCell>
          <TableCell>{commit.commit.author.date}</TableCell>
          <TableCell>{commit.commit.message}</TableCell>
      </TableRow>)
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SHA</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Message</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { renderCommits() }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommitsTable;
