import React from "react";
import styled from "styled-components";
import { darkTheme } from "@kleros/ui-components-library";
import useTimer from "@/hooks/useTimer";

const StyledTimer = styled.p`
  font-weight: 200;
  font-size: 14px;
  color: ${darkTheme.klerosUIComponentsSecondaryBlue};
`;

interface TimerProps {
  expirytime: number;
}

const Timer: React.FC<TimerProps> = ({ expirytime }) => {
  const { timeLeft, formattedTimeLeft } = useTimer(expirytime);

  const renderTimer = () => {
    if (timeLeft === null) {
      return null;
    }
    if (timeLeft <= 0) {
      return "Expired";
    }
    return `Expires in: ${formattedTimeLeft}`;
  };

  return <StyledTimer>{renderTimer()}</StyledTimer>;
};

export default Timer;
