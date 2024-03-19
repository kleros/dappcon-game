import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { darkTheme } from "@kleros/ui-components-library";
import UserIcon from "@/assets/user.svg";
import ConnectionsIcon from "@/assets/connections.svg";
import { Overlay } from "@/components/Overlay";
import Explore from "@/layout/Header/Navbar/Explore";
import { useOpenContext } from "./MobileHeader";

const Wrapper = styled.div<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
`;

const StyledOverlay = styled(Overlay)`
  top: unset;
`;

const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  z-index: 1;
  background-color: ${darkTheme.klerosUIComponentsWhiteBackground};
  border: 1px solid ${darkTheme.klerosUIComponentsStroke};
  box-shadow: 0px 2px 3px ${darkTheme.klerosUIComponentsDefaultShadow};
  transform-origin: top;
  transform: scaleY(${({ isOpen }) => (isOpen ? "1" : "0")});
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition-property: transform, visibility;
  transition-duration: ${darkTheme.klerosUIComponentsTransitionSpeed};
  transition-timing-function: ease;
  padding: 24px;

  hr {
    margin: 24px 0;
  }
`;

const StyledDivider = styled.hr`
  border: 1px solid ${darkTheme.klerosUIComponentsStroke};
`;

const StyledItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 16px;
  gap: 16px;
`;

export interface ISettings {
  toggleIsSettingsOpen: () => void;
}

export interface IHelp {
  toggleIsHelpOpen: () => void;
}

export interface IDappList {
  toggleIsDappListOpen: () => void;
}

const NavBar: React.FC = () => {
  const { isOpen } = useOpenContext();
  return (
    <>
      <Wrapper {...{ isOpen }}>
        <StyledOverlay />
        <Container {...{ isOpen }}>
          <StyledItems>
            <Image src={UserIcon} alt="User" /> Vaitalik.eth
          </StyledItems>
          <StyledItems>
            <Image src={ConnectionsIcon} alt="Connections" /> 21 Connections
          </StyledItems>
          <StyledDivider />
          <Explore />
        </Container>
      </Wrapper>
    </>
  );
};

export default NavBar;
