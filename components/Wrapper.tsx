import React from "react";
import styled from "@emotion/styled";

type Size = "xl" | "lg" | "md" | "sm";
type Props = {
  size?: Size;
} & React.HTMLAttributes<HTMLDivElement>;

interface WrapperStyles extends React.CSSProperties {
  "--size": string;
}

const STYLES: {
  [key in Size]: WrapperStyles;
} = {
  xl: {
    "--size": "1280px",
  },
  lg: {
    "--size": "1028px",
  },
  md: {
    "--size": "768px",
  },
  sm: {
    "--size": "480px",
  },
};

export const MaxWidthWrapper: React.FC<Props> = ({
  size = "xl",
  ...delegated
}) => {
  const styles = STYLES[size];
  return <Wrapper style={styles} {...delegated} />;
};

const Wrapper = styled.div`
  max-width: var(--size);
  margin: 0 auto;
  padding: 0 12px;
`;
