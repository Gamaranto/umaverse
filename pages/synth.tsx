import React from "react";
import styled from "@emotion/styled";

import {
  Layout,
  Hero,
  Card as UnstyledCard,
  Value,
  Link,
  Table,
  MaxWidthWrapper,
  BaseButton,
  LineChart,
  SynthPlaceholderIcon,
  GettingStarted,
  LiveIndicator,
} from "../components";

import { formatMillions, QUERIES } from "../utils";
import LeftArrow from "../public/icons/arrow-left.svg";

const synthName = "Yield Dollar renBTC Jun 2021";
const synthAddress = "0x5e74C9036fb86BD7eCd7C44a0673EFc32eA31cb";
const synthDescription = {
  title: "About Yield Dollar renBTC",
  description:
    "Dummy text lorem ipsum which the interest rates are determined for yUSD are structurally different from MakerDAO and Compound’s mechanisms.Compound uses an algorithm to determine interest rates based on utilization. Nothing stops utilization from reaching 100%, although it rarely stays there for long. In these occasions, pools become fully utilized and lenders are unable to withdraw capital. The rates are optimized to encourage the market to keep the lending pools solvent.",
};
const isSynthLive = true;
const synthCategory = "Yield Dollar";
const fakeTVL = [{}];

const BackAction = () => {
  return (
    <ActionWrapper href="/">
      <LeftArrow />
      Back to projects
    </ActionWrapper>
  );
};

const ActionWrapper = styled(Link)`
  color: var(--white);
  font-size: ${14 / 16}rem;
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 16px;
`;

const SynthPage: React.FC = () => {
  return (
    <Layout title="Umaverse">
      <Hero topAction={<BackAction />}>
        <HeroContentWrapper>
          <SynthPlaceholderIcon category={synthCategory} />

          <div>
            <Heading>{synthName}</Heading>
            <Description>{synthAddress}</Description>
          </div>
          <StyledLiveIndicator isLive={isSynthLive} />
        </HeroContentWrapper>
        <CardWrapper>
          <Card>
            <CardContent>
              <CardHeading>
                TVL <span>(Total Value Locked)</span>
              </CardHeading>
              <Value
                value={22_850_000}
                format={(v) => (
                  <>
                    ${formatMillions(v)}{" "}
                    <span style={{ fontWeight: 400 }}>M</span>
                  </>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeading>Token Price</CardHeading>
              <Value value={1.03} format={(v) => `$${v}`}></Value>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeading>
                Change <span>(24h)</span>
              </CardHeading>
              <Value
                value={3.2}
                format={(v: number) => (
                  <span style={{ color: "var(--green)" }}>{v} %</span>
                )}
              />
            </CardContent>
          </Card>
        </CardWrapper>
      </Hero>
      <div>
        <GettingStarted />
        <LineChart data={fakeData} width={500} height={500} />
      </div>
    </Layout>
  );
};

export default SynthPage;

const CardWrapper = styled.div`
  display: grid;
  color: var(--gray-700);
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  margin-top: 30px;
  @media ${QUERIES.tabletAndUp} {
    column-gap: 20px;
  }
`;

const Card = styled(UnstyledCard)`
  position: relative;
`;
const CardContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & > h3 {
    font-weight: 700;
  }
  & > div {
    color: var(--primary);
    font-size: clamp(1.375rem, 1.3vw + 1.1rem, 2.25rem);
    font-weight: 700;
  }
`;

const CardHeading = styled.h3`
  font-weight: 600;
  & > span {
    font-weight: 300;
  }
`;

const Heading = styled.h1`
  font-weight: 700;
  /* Fluid typography, will make the font range between 1.5rem and 2.125rem depending on screen size */
  font-size: clamp(1.5rem, 1.5vw + 1rem, 2.125rem);
  max-width: 250px;
  @media ${QUERIES.tabletAndUp} {
    max-width: revert;
  }
`;
const Description = styled.span`
  font-size: ${20 / 16}rem;
  display: none;

  @media ${QUERIES.tabletAndUp} {
    display: block;
  }
`;
const StyledLiveIndicator = styled(LiveIndicator)`
  margin-left: auto;
`;

const HeroContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 35px;
`;
