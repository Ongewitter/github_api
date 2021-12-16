import React from "react";

import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function RepositoriesTable({ repositories, onRepositoryClicked }) {
  if (repositories.length <= 0) { return '' };

  function renderRepositories() {
    return repositories.map(repo => {

      return (
        <TableRow
          key={`repository-` + repo.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>
            <Button onClick={() => onRepositoryClicked(repo.name)}>{repo.name}</Button>
          </TableCell>
          <TableCell>{repo.language}</TableCell>
          <TableCell>{repo.description}</TableCell>
          <TableCell>{repo.created_at}</TableCell>
          <TableCell>{repo.updated_at}</TableCell>
          <TableCell>
            <a href={repo.html_url}>{repo.html_url}</a>
          </TableCell>
        </TableRow>) 
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Link</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { renderRepositories() }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RepositoriesTable;
