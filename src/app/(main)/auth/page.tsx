"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Divider from "@/assets/divider.svg";
import LabeledInput from "@/components/LabeledInput";
import LightLinkButton from "@/components/LightLinkButton";
import useAuthentication from "@/hooks/useAuthentication";
import { toast } from "react-toastify";

const MIN_USERNAME_LENGTH = 3;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  text-align: center;
  gap: 48px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const FormError = styled.p`
  color: red;
  font-weight: 200;
`;

const Heading = styled.div`
  h2:first-child {
    font-weight: 200;
  }

  h2:last-child {
    font-weight: 400;
  }
`;

const StyledText = styled.p`
  font-weight: 200;
`;

const StyledDivider = styled(Divider)<{ top?: boolean; bottom?: boolean }>`
  margin: ${({ top }) => (top ? "0 0 20px" : "20px 0 0")};
  transform: ${({ bottom }) =>
    bottom ? "rotateY(180deg) rotateX(180deg)" : "none"};
`;

const StyledLinkButton = styled(LightLinkButton)`
  width: 100%;
`;

const Auth: React.FC = () => {
  const { authenticate, isLoading } = useAuthentication();
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get("token") || "");
  }, []);

  const handleStart = async () => {
    if (username.length < MIN_USERNAME_LENGTH) {
      setUsernameError(
        `Username must be at least ${MIN_USERNAME_LENGTH} characters long`
      );
      return;
    }
    setUsernameError(null);

    try {
      await authenticate(username, token);
      setTimeout(() => {
        router.push("/");
      }, 1000);
      toast.success("Authenticated successfully , Redirecting...");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <Heading>
        <h2>Welcome to</h2>
        <h2>Kleros Schelling Game</h2>
      </Heading>
      <FormContainer>
        <StyledDivider top />
        <StyledText>Type your name to start</StyledText>
        <LabeledInput
          name="Name"
          label="Name"
          placeholder="Bob"
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <FormError>{usernameError}</FormError>}
        <StyledLinkButton
          text={isLoading ? "Authenticating..." : "Start"}
          disabled={isLoading}
          onClick={handleStart}
        />
        <StyledDivider bottom />
      </FormContainer>
    </Container>
  );
};

export default Auth;
