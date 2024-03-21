import React from "react";
import styled from "styled-components";

const StyledOl = styled.ol`
  list-style-type: decimal;
  padding-left: 20px;

  & > li {
    margin-bottom: 10px;
  }

  & ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  & ul > li {
    margin-bottom: 5px;
  }
`;

const StyledLi = styled.li`
  margin-bottom: 10px;
`;

const StyledUlLi = styled.li`
  margin-bottom: 5px;
`;

const Rule: React.FC = () => {
  return (
    <StyledOl>
      <StyledLi>
        Find people using the Kleros bracelet, scan their QR code on the App,
        and answer the question. More questions you answer higher your chances
        of winning the rewards.
      </StyledLi>
      <StyledLi>
        At the end of the game, the answers selected by the majority for each
        question are considered the “correct” answer.
        <ul>
          <StyledUlLi>
            If you answered the majority answer, you will receive a reward.
          </StyledUlLi>
          <StyledUlLi>
            If you answered the minority answer, you will not receive a reward.
          </StyledUlLi>
        </ul>
      </StyledLi>
      <StyledLi>Claim your rewards.</StyledLi>
    </StyledOl>
  );
};

export default Rule;
