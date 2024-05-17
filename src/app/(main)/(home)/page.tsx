"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode";
import LightLinkButton from "@/components/LightLinkButton";
import useAuthentication from "@/hooks/useAuthentication";
import { encrypt } from "@/lib/crypto";
import QrReader from "./QrReader";
import Timer from "@/components/Timer";
import { QR_CODE_EXPIRY, GAME_END_TIMESTAMP } from "@/lib/game.config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 48px;
`;

const ScannerContainer = styled.div`
  position: relative;
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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Heading = styled.h2`
  font-weight: 400;
`;

const Description = styled.p`
  font-weight: 200;
  font-size: 14px;
`;

const StyledText = styled.p`
  font-weight: 400;
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const getQRUrl = async (qrData: string): Promise<string> => {
  const encryptedData = await encrypt(qrData);
  return QRCode.toDataURL(BASE_URL + "/question/" + encryptedData);
};

interface IScanner {
  setIsScannerOpen: (arg0: boolean) => void;
}

const Scanner: React.FC<IScanner> = ({ setIsScannerOpen }) => {
  return (
    <ScannerContainer>
      <QrReader />
      <StyledLinkButton
        onClick={() => setIsScannerOpen(false)}
        text="Go back"
      />
    </ScannerContainer>
  );
};

const Home: React.FC = () => {
  const [qrUrl, setQrUrl] = useState<string>("");
  const [qrExpiryTimestamp, setQrExpiryTimestamp] = useState<number>(0);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const { userid } = useAuthentication();

  useEffect(() => {
    const refreshQR = async () => {
      const timestamp = Date.now().toString();
      const qrData = JSON.stringify({ userid, timestamp });

      try {
        const url = await getQRUrl(qrData);
        setQrUrl(url);
        setQrExpiryTimestamp(Number(timestamp) + QR_CODE_EXPIRY);
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

  return (
    <Container>
      <HeaderContainer>
        <Heading>Kleros Schelling Game</Heading>
        <Description>
          until{" "}
          {new Date(GAME_END_TIMESTAMP * 1000).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          at midnight
        </Description>
      </HeaderContainer>
      {isScannerOpen ? (
        <Scanner {...{ setIsScannerOpen }} />
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
              <>
                <Timer expirytime={qrExpiryTimestamp} />
                <StyledQR src={qrUrl} alt="My QR Code" />
              </>
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
