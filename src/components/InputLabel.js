import React from "react";
import styled from 'styled-components';

function InputLabel({children}) {
  return (
    <S.Label>
      {children}
    </S.Label>
  );
}

export default InputLabel;

const S = {};
S.Label = styled.label`
  display: block;
`;
