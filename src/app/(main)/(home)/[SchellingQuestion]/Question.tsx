"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { darkTheme, Radio } from "@kleros/ui-components-library";
import LightLinkButton from "@/components/LightLinkButton";
import { question } from "@/consts/dummy-data";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 28px;
  .button {
    margin-top: 28px;
  }
`;

const StyledQuestion = styled.h2`
  font-weight: 400;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledRadio = styled(Radio)`
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  & > input ~ span {
    border: 1px solid ${darkTheme.klerosUIComponentsPrimaryBlue};
  }
  & > input:checked ~ span {
    background: ${darkTheme.klerosUIComponentsPrimaryBlue};
  }
`;

const StyledText = styled.p`
  font-weight: 200;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
  margin-top: 28px;
`;

interface QuestionProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const Question: React.FC<QuestionProps> = ({ setConnected }) => {
  const [radioValue, setRadioValue] = useState<string | null>(null);

  const changeRadioValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setRadioValue(event.target.value);

  const handleAnswer = () => {
    if (radioValue !== null) setConnected(true);
  };

  return (
    <Container>
      <StyledText>Schelling Question</StyledText>
      <StyledQuestion>{question.question}</StyledQuestion>
      <Options>
        {question.options.map((option) => (
          <StyledRadio
            key={option}
            label={option}
            value={option}
            checked={radioValue === option}
            onChange={changeRadioValue}
          />
        ))}
      </Options>
      <StyledLinkButton text="Answer" onClick={handleAnswer} />
    </Container>
  );
};

export default Question;
