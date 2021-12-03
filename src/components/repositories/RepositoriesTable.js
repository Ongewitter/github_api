import React from "react";
import styled from 'styled-components';

import Table from "../Table";
import TableHeader from "../TableHeader";
import TableBody from "../TableBody";
import TableRow from "../TableRow";

function RepositoriesTable({ repositories, onRepositoryClick }) {

  function renderRepositories() {
    return repositories.map(repo => {
      return (<TableRow key={`repo-${repo.id}`}>
        <td>
          <span onClick={() => onRepositoryClick()}>{repo.name}</span>
        </td>
        <td>{repo.language}</td>
        <td>{repo.description}</td>
        <td>{repo.created_at}</td>
        <td>{repo.updated_at}</td>
        <td><a href={repo.html_url}>{repo.html_url}</a></td>
        <td>
          <S.ButtonWrapper>
          </S.ButtonWrapper>
        </td>
      </TableRow>) 
    });
  }

  return (
    <Table>
      <TableHeader>
        <tr>
          <td>Name</td>
          <td>Language</td>
          <td>Description</td>
          <td>Created At</td>
          <td>Updated At</td>
          <td>Link</td>
          <td></td>
        </tr>
      </TableHeader>
      <TableBody>
        { renderRepositories() }
      </TableBody>
    </Table>
  );
}

export default RepositoriesTable;

const S = {};
S.ButtonWrapper = styled.div`
  display: inline-block;
`
