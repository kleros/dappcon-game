"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { darkTheme, Radio } from "@kleros/ui-components-library";
import LightLinkButton from "@/components/LightLinkButton";
import { Database } from "@/types/supabase";

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

  const [radioValue, setRadioValue] = useState<string | null>(null);

  const changeRadioValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setRadioValue(event.target.value);

  const handleAnswer = () => {
    if (radioValue !== null) setConnected(true);
  };

  type Question = Database["public"]["Tables"]["questions"]["Row"];

  const {
    isPending,
    error,
    data: question,
  } = useQuery<Question>({
    queryKey: ["question"],
    queryFn: () => fetch(`/api/question?id=${id}`).then((res) => res.json()),
  });

  if (isPending)
    return (
      <Container>
        <StyledText>Please wait ...</StyledText>
      </Container>
    );

  if (error)
    return (
      <Container>
        <StyledText>{error.message}</StyledText>
      </Container>
    );

  return (
    <Container>
      <StyledText>Schelling Question</StyledText>
      <StyledQuestion>{question?.question}</StyledQuestion>
      <Options>
        {question?.answers.map((option) => (
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
