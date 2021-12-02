import React from "react";
import styled from 'styled-components';

function Table({children}) {
  return (
    <S.table>
      {children}
    </S.table>
  );
}

export default Table;

const S = {};
S.table = styled.table`
  display: block;
`;
