import { useState } from "react";
import styled from "styled-components";
// import "./formInput.css";

const FormulaInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`;

const Input = styled.input`
  padding: 15px;
  margin: 10px 0px;
  border-radius: 5px;
  border: 1px solid gray;

  &:invalid[focused="true"] {
    border: 1px solid red;
  }
  &:invalid[focused="true"] ~ span {
    display: block;
  }
`;
const Label = styled.label`
  font-size: 12px;
  color: gray;
`;
const Span = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
  display: none;
`;

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <FormulaInputDiv>
      <Label>{label}</Label>
      <Input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <Span>{errorMessage}</Span>
    </FormulaInputDiv>
  );
};

export default FormInput;
