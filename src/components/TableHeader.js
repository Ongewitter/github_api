import React from "react";
import styled from 'styled-components';

function TableHeader({ children }) {
  return (
    <S.thead>
      {children}
    </S.thead>
  );
}

export default TableHeader;

const S = {};
S.thead = styled.thead`
  border: 1px solid black;
`;
