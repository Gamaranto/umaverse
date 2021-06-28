import React from "react";
import styled from "@emotion/styled";

type LiveIndicatorProps = {
  isLive: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  isLive,
  ...delegated
}) => {
  return (
    <Wrapper {...delegated}>
      <Dot
        style={{ "--dotColor": isLive ? "var(--green)" : "var(--primary)" }}
      />
      <div>Live</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--gray-600);
  border-radius: 5px;
  padding: 5px 25px 5px 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const Dot = styled.div`
  min-height: 10px;
  min-width: 10px;
  max-width: 10px;
  max-height: 10px;
  margin-right: 10px;
  background-color: var(--dotColor);
  border-radius: 99px;
`;
