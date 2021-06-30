import styled from "@emotion/styled";
// import { QUERIES } from "../../utils";

export const Wrapper = styled.div`
  box-shadow: 0px 4px 4px 0px #00000040;
  background: #ffffff;
  padding-bottom: 1rem;
  max-width: 400px;
`;

export const FormRow = styled.div`
  display: flex;
  div {
    margin: 0 5px;
    > div {
      &:nth-child(2) {
        flex-grow: 16;
      }
    }
  }
  padding: 0 0.5rem;
`;

export const SmallTitle = styled.h3`
  margin-left: 5px;
  margin-bottom: 10px;
  padding: 1rem 0.5rem 0;
`;

const FormWrapper = styled.div`
  padding-bottom: 1rem;
`;

export const TopFormWrapper = styled(FormWrapper)`
  background-color: #fff;
  padding-bottom: 2rem;
`;

export const BottomFormWrapper = styled(FormWrapper)`
  background-color: #fafbfb;
`;

export const BalanceRow = styled.div`
  display: flex;
  div {
    display: flex;
    margin-left: auto;
    justify-content: space-between;
    width: 230px;
    font-family: "Halyard Display";
    font-size: ${14 / 16}rem;
    color: #a8a8a8;
    span {
      &:nth-child(2) {
        color: #ff4b4b;
        margin-right: 24px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;
