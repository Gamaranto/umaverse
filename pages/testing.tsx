import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import LSPForm from "../components/lsp-form/LSPForm";
import { KNOWN_LSP_ADDRESS } from "../utils/constants";

import createLSPContractInstance from "../components/lsp-form/createLSPContractInstance";
import createERC20ContractInstance from "../components/lsp-form/createERC20ContractInstance";
import useERC20ContractValues from "../hooks/useERC20ContractValues";

enum ContractState {
  Open,
  ExpiredPriceRequested,
  ExpiredPriceReceived,
}

const toBN = ethers.BigNumber.from;
const Testing = () => {
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [address, setAddress] = useState("");

  const [lspContract, setLSPContract] = useState<ethers.Contract | null>(null);
  const [erc20Contract, setERC20Contract] = useState<ethers.Contract | null>(
    null
  );
  const [collateralBalance, setCollateralBalance] = useState<ethers.BigNumber>(
    toBN("0")
  );

  const [collateralPerPair, setCollateralPerPair] = useState<ethers.BigNumber>(
    toBN("1")
  );

  const [collateralDecimals, setCollateralDecimals] = useState("18");

  const [longTokenAddress, setLongTokenAddress] = useState("");
  const [shortTokenAddress, setShortTokenAddress] = useState("");

  const { balance: longTokenBalance, refetchBalance: refetchLongTokenBalance } =
    useERC20ContractValues(
      longTokenAddress,
      address,
      web3Provider ? web3Provider.getSigner() : null
    );

  const {
    balance: shortTokenBalance,
    refetchBalance: refetchShortTokenBalance,
  } = useERC20ContractValues(
    shortTokenAddress,
    address,
    web3Provider ? web3Provider.getSigner() : null
  );

  const [contractState, setContractState] = useState<ContractState>(
    ContractState.Open
  );
  const [contractExpirationTime, setContractExpirationTime] =
    useState<string>("");

  const [currentTime, setCurrentTime] = useState<string>("");
  const [showSettle, setShowSettle] = useState(false);

  console.log("new values", contractState, contractExpirationTime, currentTime);

  useEffect(() => {
    if (currentTime && contractExpirationTime) {
      if (
        currentTime > contractExpirationTime &&
        contractState === ContractState.Open
      ) {
        setShowSettle(true);
      }

      // if (contractState > 0) {
      //   setShowSettle(false);
      // }
    }
  }, [contractExpirationTime, currentTime, contractState]);
  // Get contract data and set values.
  useEffect(() => {
    if (web3Provider && !lspContract) {
      const signer = web3Provider.getSigner();
      const contract = createLSPContractInstance(signer, KNOWN_LSP_ADDRESS);
      // console.log("contract", contract);
      contract.contractState().then((cs: ContractState) => {
        setContractState(cs);
      });

      contract
        .expirationTimestamp()
        .then((res: ethers.BigNumber) => {
          setContractExpirationTime(res.toString());
        })
        .catch((err: any) => {
          console.log("err in timestamp call", err);
        });

      contract.getCurrentTime().then((res: ethers.BigNumber) => {
        setCurrentTime(res.toString());
      });

      contract.collateralToken().then(async (res: any) => {
        const erc20 = createERC20ContractInstance(signer, res);
        erc20.decimals().then((decimals: ethers.BigNumber) => {
          setCollateralDecimals(decimals.toString());
        });

        const balance = (await erc20.balanceOf(address)) as ethers.BigNumber;
        setCollateralBalance(balance);
        setERC20Contract(erc20);
      });

      contract.collateralPerPair().then((cpp: ethers.BigNumber) => {
        setCollateralPerPair(cpp);
      });

      contract.longToken().then((addr: string) => {
        setLongTokenAddress(addr);
      });

      contract.shortToken().then((addr: string) => {
        setShortTokenAddress(addr);
      });

      setLSPContract(contract);
    }
  }, [web3Provider, lspContract]);

  useEffect(() => {
    if ((window as any).ethereum && web3Provider === null) {
      const mm = (window as any).ethereum;
      const provider = new ethers.providers.Web3Provider(mm);
      setAddress(mm.selectedAddress);
      setWeb3Provider(provider);
    }
  }, []);

  return (
    <LSPForm
      address={address}
      web3Provider={web3Provider}
      contractAddress={KNOWN_LSP_ADDRESS}
      lspContract={lspContract}
      erc20Contract={erc20Contract}
      collateralBalance={collateralBalance}
      collateralPerPair={collateralPerPair}
      setCollateralBalance={setCollateralBalance}
      collateralDecimals={collateralDecimals}
      longTokenBalance={longTokenBalance}
      shortTokenBalance={shortTokenBalance}
      refetchLongTokenBalance={refetchLongTokenBalance}
      refetchShortTokenBalance={refetchShortTokenBalance}
      showSettle={showSettle}
      setShowSettle={setShowSettle}
    />
  );
};

export default Testing;
