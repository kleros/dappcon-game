import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Button, darkTheme } from "@kleros/ui-components-library";

const StyledButton = styled(Button)`
  background-color: ${darkTheme.klerosUIComponentsPrimaryBlue};
  padding: 10px 20px;
`;

interface ILightButton {
  text: string;
  url?: string;
  Icon?: React.FC<React.SVGAttributes<SVGElement>>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  target?: string;
  rel?: string;
  className?: string;
}

const LightButton: React.FC<ILightButton> = ({
  text,
  url,
  Icon,
  onClick,
  disabled,
  target,
  rel,
  className,
}) =>
  url ? (
    <Link href={url} passHref {...{ target, rel }}>
      <StyledButton
        variant="primary"
        small
        {...{ text, Icon, onClick, disabled, className }}
      />
    </Link>
  ) : (
    <StyledButton
      variant="primary"
      small
      {...{ text, Icon, onClick, disabled, className }}
    />
  );

export default LightButton;
