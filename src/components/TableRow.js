import React from "react";
import styled from 'styled-components';

function TableRow({ children }) {
  return (
    <S.tr>
      {children}
    </S.tr>
  );
}

export default TableRow;

const S = {};
S.tr = styled.tr``;
