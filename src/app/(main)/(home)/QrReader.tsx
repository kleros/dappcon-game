"use client";
import React from "react";
import styled from "styled-components";
import { QrReader as QRReader, QrReaderProps } from "react-qr-reader";
import { darkTheme } from "@kleros/ui-components-library";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ViewFinder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  border: 2px solid ${darkTheme.klerosUIComponentsLightBlue};
`;

const ScannerOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  border: 1px solid ${darkTheme.klerosUIComponentsSecondaryBlue};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Reader = styled(QRReader)`
  position: relative;
  padding: 4px;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

const QrReader: React.FC = () => {
  const OnResultFunction = (result: any) => {
    if (result) {
      const isValid = /[0-9a-fA-F]{64}/.test(result.text);
      if (isValid) {
        window.location.href = `/question/${result?.text}`;
      }
    }
  };

  const readerProps: QrReaderProps = {
    constraints: { facingMode: "environment" }, // Use the back camera
    onResult: OnResultFunction,
  };

  return (
    <Container>
      <ReaderWrapper>
        <ViewFinder />
        <Reader {...readerProps} />
        <ScannerOverlay />
      </ReaderWrapper>
    </Container>
  );
};

export default QrReader;
