import React from "react";
import styled from "styled-components";
import { Field, FieldProps } from "@kleros/ui-components-library";
import { isUndefined } from "@/lib/utils";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledField = styled(Field)`
  width: 100%;
  > small {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  input {
    border: 1px solid #42498f;
    background-color: #220050;
    color: white;
  }
`;

const StyledLabel = styled.label`
  width: 100%;
  margin-bottom: 12px;
  font-size: 14px;
  text-align: left;
`;

interface ILabeledInput extends FieldProps {
  label?: string;
}
const LabeledInput: React.FC<ILabeledInput> = (props) => {
  return (
    <Container>
      {!isUndefined(props.label) ? (
        <StyledLabel id={props.label}>{props.label}</StyledLabel>
      ) : null}
      <StyledField {...props} id={props?.label} />
    </Container>
  );
};

export default LabeledInput;
