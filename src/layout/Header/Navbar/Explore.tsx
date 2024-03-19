import React from "react";
import styled from "styled-components";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { darkTheme } from "@kleros/ui-components-library";
import { useOpenContext } from "./MobileHeader";

const Container = styled.div`
  display: flex;
  gap: 0px;
  flex-direction: column;
`;

const LinkContainer = styled.div`
  display: flex;
  min-height: 32px;
  align-items: center;
`;

const Title = styled.h1`
  display: block;
  padding-bottom: 16px
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  color: ${darkTheme.klerosUIComponentsPrimaryText};
  text-decoration: none;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
`;

const links = [
  { to: "/", text: "Home" },
  { to: "/rules", text: "Rules" },
  { to: "/leaderboard", text: "Leaderboard" },
  { to: "/about", text: "About Kleros" },
];

const Explore: React.FC = () => {
  const pathname = usePathname()
  const { toggleIsOpen } = useOpenContext();

  return (
    <Container>
      <Title>Explore</Title>
      {links.map(({ to, text }) => (
        <LinkContainer key={text}>
          <StyledLink
            href={to}
            onClick={toggleIsOpen}
            isActive={to === "/" ? pathname === "/" : pathname.startsWith(to)}
          >
            {text}
          </StyledLink>
        </LinkContainer>
      ))}
    </Container>
  );
};

export default Explore;
