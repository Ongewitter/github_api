import React from "react";
import styled from 'styled-components';

import Table from "../Table";
import TableHeader from "../TableHeader";
import TableBody from "../TableBody";
import TableRow from "../TableRow";

function RepositoryTable({ repositories }) {

  function renderRepositories() {
    return repositories.map(repo => {
      return (<TableRow key={repo.id}>
        <td>{repo.name}</td>
        <td>{repo.hp}</td>
        <td>{repo.armor}</td>
        <td>{repo.toHit}</td>
        <td>{repo.damage.amount} 🎲  {repo.damage.die}</td>
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
          <td>HP</td>
          <td>Armor</td>
          <td>toHit</td>
          <td>Damage</td>
          <td>Bonus Damage</td>
          <td>Team</td>
          <td></td>
        </tr>
      </TableHeader>
      <TableBody>
        { renderRepositories() }
      </TableBody>
    </Table>
  );
}

export default RepositoryTable;

const S = {};
S.ButtonWrapper = styled.div`
  display: inline-block;
`
