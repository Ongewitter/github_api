import React from "react";
import styled from 'styled-components';

function TableBody({ children }) {
  return (
    <S.tbody>
      {children}
    </S.tbody>
  );
}

export default TableBody;

const S = {};
S.tbody = styled.tbody``;
