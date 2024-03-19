"use client"
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { darkTheme } from "@kleros/ui-components-library";
import LearnAboutKleros from "@/assets/learn-about-kleros.svg";
import { socialmedia } from "@/consts/socialmedia";



const Container = styled.div`
  height: 122px;
  width: 100%;
  background-color: ${darkTheme.klerosUIComponentsPrimaryPurple};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 32px 8px 32px;
  gap: 24px;

  .learn-more-about-kleros {
    min-height: 24px;
  }

  .socialmedia {
    display: flex;
    gap: 16px;
    justify-content: center;

    a {
      display: inline-block;
      svg {
        height: 16px;
        width: 16px;
        max-heigth: 16px;
        max-width: 16px;
        fill: white;
      }
    }
  }
`;

const LearnMoreAboutKleros: React.FC = () => (
  <a className="learn-more-about-kleros" href="https://kleros.io" target="_blank" rel="noreferrer">
    <Image src={LearnAboutKleros} alt="Learn about Kleros" />
  </a>
);

const SocialMedia = () => (
  <div className="socialmedia">
    {Object.values(socialmedia).map((site, i) => (
      <a key={i} href={site.url} target="_blank" rel="noreferrer">
        <Image src={site.icon} alt={site.url} />
      </a>
    ))}
  </div>
);

const Footer: React.FC = () => (
  <Container>
    <LearnMoreAboutKleros />
    <SocialMedia />
  </Container>
);

export default Footer;
