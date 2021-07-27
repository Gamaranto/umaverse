import React, { FC, useState, useCallback } from "react";
import {
  SmallTitle,
  TopFormWrapper,
  BottomFormWrapper,
  DownArrowWrapper,
  ButtonWrapper,
  MintButton,
} from "./LSPForm.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import toWeiSafe from "../../utils/convertToWeiSafely";

import LongShort from "./LongShort";
import Collateral from "./Collateral";

const toBN = ethers.BigNumber.from;
const scaledToWei = toBN("10").pow("18");

// max uint value is 2^256 - 1
const MAX_UINT_VAL = ethers.constants.MaxUint256;
const INFINITE_APPROVAL_AMOUNT = MAX_UINT_VAL;

interface Props {
  address: string;
  contractAddress: string;
  setShowSettle: React.Dispatch<React.SetStateAction<boolean>>;
  lspContract: ethers.Contract | null;
  erc20Contract: ethers.Contract | null;
  web3Provider: ethers.providers.Web3Provider | null;
  collateralBalance: ethers.BigNumber;
  collateralPerPair: ethers.BigNumber;
  setCollateralBalance: React.Dispatch<React.SetStateAction<ethers.BigNumber>>;
  collateralDecimals: string;
  longTokenBalance: ethers.BigNumber;
  longTokenDecimals: string;
  shortTokenBalance: ethers.BigNumber;
  shortTokenDecimals: string;
  refetchLongTokenBalance: () => void;
  refetchShortTokenBalance: () => void;
}

const MintForm: FC<Props> = ({
  lspContract,
  erc20Contract,
  contractAddress,
  collateralBalance,
  collateralPerPair,
  address,
  setCollateralBalance,
  collateralDecimals,
  longTokenBalance,
  longTokenDecimals,
  shortTokenBalance,
  shortTokenDecimals,
  refetchLongTokenBalance,
  refetchShortTokenBalance,
}) => {
  const [collateral, setCollateral] = useState("uma");
  const [amount, setAmount] = useState("");
  const [longTokenAmount, setLongTokenAmount] = useState("");
  const [shortTokenAmount, setShortTokenAmount] = useState("");

  const mint = useCallback(async () => {
    if (lspContract && erc20Contract && amount) {
      const weiAmount = toWeiSafe(amount);
      try {
        const allowance = await erc20Contract.allowance(
          address,
          contractAddress
        );
        const balance = await erc20Contract.balanceOf(address);
        const hasToApprove = allowance.lt(balance);
        if (hasToApprove) {
          const approveTx = await erc20Contract.approve(
            contractAddress,
            INFINITE_APPROVAL_AMOUNT
          );

          await approveTx.wait();
        }
        // Need to send the correct amount based on the collateral pair ** the amount
        // User has specified in the input.
        // All operations that make the number larger come first. All the operations that make the number smaller come last.
        const mintAmount = weiAmount.mul(scaledToWei).div(collateralPerPair);
        lspContract
          .create(mintAmount)
          .then((tx: any) => {
            return tx.wait(1);
          })
          .then(async () => {
            setAmount("");
            setLongTokenAmount("");
            setShortTokenAmount("");
            const balance = (await erc20Contract.balanceOf(
              address
            )) as ethers.BigNumber;
            setCollateralBalance(balance);
            refetchLongTokenBalance();
            refetchShortTokenBalance();
          });
      } catch (err) {
        console.log("err", err);
      }
    }
  }, [lspContract, erc20Contract, amount]);

  return (
    <div>
      <TopFormWrapper>
        <SmallTitle>Input</SmallTitle>
        <Collateral
          collateral={collateral}
          setCollateral={setCollateral}
          amount={amount}
          setAmount={setAmount}
          collateralBalance={collateralBalance}
          collateralPerPair={collateralPerPair}
          collateralDecimals={collateralDecimals}
          setLongTokenAmount={setLongTokenAmount}
          setShortTokenAmount={setShortTokenAmount}
        />
      </TopFormWrapper>
      <DownArrowWrapper>
        <FontAwesomeIcon icon={faArrowDown} />
      </DownArrowWrapper>

      <BottomFormWrapper>
        <SmallTitle>Output</SmallTitle>
        <LongShort
          setAmount={setAmount}
          longTokenAmount={longTokenAmount}
          setLongTokenAmount={setLongTokenAmount}
          shortTokenAmount={shortTokenAmount}
          setShortTokenAmount={setShortTokenAmount}
          collateralPerPair={collateralPerPair}
          longTokenBalance={longTokenBalance}
          shortTokenBalance={shortTokenBalance}
          collateralDecimals={collateralDecimals}
        />
      </BottomFormWrapper>
      <ButtonWrapper>
        <MintButton
          onClick={() => {
            return mint();
          }}
        >
          Mint
        </MintButton>
      </ButtonWrapper>
    </div>
  );
};

export default MintForm;
