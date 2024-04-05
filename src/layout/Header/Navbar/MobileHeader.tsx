"use client";
import React, { useContext, useMemo, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useClickAway, useToggle } from "react-use";
import HamburgerIcon from "@/assets/Menu.svg";
import KlerosCourtLogo from "@/assets/kleros-court.svg";
import NavBar from "./Navbar";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledHamburger = styled.a`
  padding: 0;
`;

const OpenContext = React.createContext({
  isOpen: false,
  toggleIsOpen: () => {
    // Placeholder
  },
});

export function useOpenContext() {
  return useContext(OpenContext);
}

const MobileHeader: React.FC = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const containerRef = useRef(null);
  useClickAway(containerRef, () => toggleIsOpen(false));
  const memoizedContext = useMemo(
    () => ({ isOpen, toggleIsOpen }),
    [isOpen, toggleIsOpen]
  );
  return (
    <Container ref={containerRef}>
      <OpenContext.Provider value={memoizedContext}>
        <Link href="/">
          <KlerosCourtLogo />
        </Link>
        <NavBar />
        <StyledHamburger onClick={toggleIsOpen}>
          <HamburgerIcon />
        </StyledHamburger>
      </OpenContext.Provider>
    </Container>
  );
};
export default MobileHeader;
