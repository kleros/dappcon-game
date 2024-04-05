"use client";
import React from "react";
import styled from "styled-components";
import { darkTheme } from "@kleros/ui-components-library";
import LearnAboutKleros from "@/assets/learn-about-kleros.svg";
import { socialmedia } from "@/consts/socialmedia";

const Container = styled.div`
  position: fixed;
  height: 122px;
  width: 100%;
  bottom: 0;
  background-color: ${darkTheme.klerosUIComponentsPrimaryPurple};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 32px 8px 32px;
  gap: 24px;
`;

const KlerosLogoContainer = styled.a`
  min-height: 24px;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const LearnMoreAboutKleros: React.FC = () => (
  <KlerosLogoContainer
    href="https://kleros.io"
    target="_blank"
    rel="noreferrer"
  >
    <LearnAboutKleros />
  </KlerosLogoContainer>
);

const SocialMedia = () => (
  <SocialMediaContainer>
    {Object.values(socialmedia).map((site, i) => (
      <a key={i} href={site.url} target="_blank" rel="noreferrer">
        {site.icon}
      </a>
    ))}
  </SocialMediaContainer>
);

const Footer: React.FC = () => (
  <Container>
    <LearnMoreAboutKleros />
    <SocialMedia />
  </Container>
);

export default Footer;
