"use client";
import React from "react";
import styled from "styled-components";
import LightLinkButton from "@/components/LightLinkButton";
import Rule from "./rule";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  font-weight: 200;
  gap: 20px;
`;

const RuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  font-weight: 200;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const Rules: React.FC = () => {
  return (
    <Container>
      <p>Rules</p>
      <Heading>How it works</Heading>
      <RuleContainer>
        <Rule />
      </RuleContainer>
      <StyledLinkButton url="/" text="Return" />
    </Container>
  );
}

export default Rules;
