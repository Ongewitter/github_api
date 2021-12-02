import React from "react";
import styled from 'styled-components';

function TextInput({name, value, onChange}) {
  return (
    <S.Input type="text" name={name} value={value} onChange={onChange} />
  );
}

export default TextInput;

const S = {};
S.Input = styled.input``;
