"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "next/navigation";
import { darkTheme, Radio } from "@kleros/ui-components-library";
import LightLinkButton from "@/components/LightLinkButton";
import Timer from "@/components/Timer";
import { toast } from "react-toastify";
import { useQuestion } from "@/hooks/useQuestion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 28px;
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
  const { id } = useParams<{ id: string }>();
  const { isPending, error, question, submitAnswer } = useQuestion(id);
  const expirytime =
    Number(question?.timestamp ? question.timestamp : 0) + 90000;

  const [loading, setLoading] = useState<boolean>(false);

  const [radioValue, setRadioValue] = useState<string | null>(null);

  const changeRadioValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setRadioValue(event.target.value);

  const handleAnswer = async () => {
    if (radioValue !== null) {
      try {
        setLoading(true);
        await submitAnswer(question?.id!, radioValue);
        setLoading(false);
        setConnected(true);
      } catch (error: any) {
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Please select an option");
    }
  };

  if (isPending)
    return (
      <Container>
        <StyledText>Please wait ...</StyledText>
      </Container>
    );

  if (error) {
    return (
      <Container>
        <StyledText>{error.message}</StyledText>
      </Container>
    );
  }

  return (
    <Container>
      <StyledText>Schelling Question</StyledText>
      <Timer expirytime={expirytime} />
      <StyledQuestion>{question?.question}</StyledQuestion>
      <Options>
        {question?.answers?.map((option, index) => (
          <StyledRadio
            key={option}
            label={option}
            value={index.toString()}
            checked={radioValue === index.toString()}
            onChange={changeRadioValue}
          />
        ))}
      </Options>
      <StyledLinkButton
        disabled={loading}
        text={loading ? "Connecting..." : "Answer"}
        onClick={handleAnswer}
      />
    </Container>
  );
};

export default Question;
