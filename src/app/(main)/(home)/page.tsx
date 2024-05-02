"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode";
import LightLinkButton from "@/components/LightLinkButton";
import useAuthentication from "@/hooks/useAuthentication";
import { encrypt } from "@/lib/crypto";
import QrReader from "./QrReader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 48px;
`;

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledQR = styled.img`
  width: 100%;
  height: 100%;
  max-width: 480px;
  object-fit: cover;
  align-self: center;
`;

const StyledLoader = styled.p`
  padding: 100px 0;
  font-weight: 200;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const StyledText = styled.p`
  font-weight: 400;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const getQRUrl = async (qrData: string): Promise<string> => {
  const encryptedData = await encrypt(qrData);
  return QRCode.toDataURL(encryptedData);
};

const Home: React.FC = () => {
  const [qrUrl, setQrUrl] = useState<string>("");
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const { userid } = useAuthentication();

  useEffect(() => {
    const refreshQR = async () => {
      const timestamp = Date.now().toString();
      const qrData = JSON.stringify({ userid, timestamp });

      try {
        const url = await getQRUrl(qrData);
        setQrUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    if (userid) {
      refreshQR();
      const interval = setInterval(refreshQR, 60000);
      return () => clearInterval(interval);
    }
  }, [userid]);

  const Scanner: React.FC = () => {
    return (
      <ScannerContainer>
        <StyledText>Scan another player</StyledText>
        <QrReader />
      </ScannerContainer>
    );
  };

  return (
    <Container>
      <Heading>Kleros Schelling Game</Heading>
      {isScannerOpen ? (
        <Scanner />
      ) : (
        <>
          <ScannerContainer>
            <StyledText>Scan another player</StyledText>
            <StyledLinkButton
              onClick={() => setIsScannerOpen(true)}
              text="Scan"
            />
          </ScannerContainer>
          <ScannerContainer>
            <StyledText>My QR</StyledText>
            {qrUrl ? (
              <StyledQR src={qrUrl} alt="My QR Code" />
            ) : (
              <StyledLoader>Loading QR...</StyledLoader>
            )}
          </ScannerContainer>
        </>
      )}
    </Container>
  );
};

export default Home;
