import React, { FC } from "react";
import { FormRow, BalanceRow, iconStyles } from "./LSPForm.styled";
import EthIcon from "../../public/icons/eth-icon.svg";
import UniswapIcon from "../../public/icons/uniswap-logo.svg";
import Dropdown from "../dropdown";
import TextInput from "../text-input";
import { DropdownVariant } from "../dropdown/Dropdown";
import { LabelPlacement } from "../text-input/TextInput";
import useWindowSize from "../../hooks/useWindowSize";

interface Props {
  collateral: string;
  setCollateral: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  // Adjust CSS slightly if its the redeem form or the mint form.
  redeemForm?: boolean;
  collateralOnTop?: boolean;
  collateralBalance: string;
  collateralPerPair: string;
}

const Collateral: FC<Props> = ({
  collateral,
  setCollateral,
  amount,
  setAmount,
  collateralOnTop,
  redeemForm,
  collateralBalance,
}) => {
  const size = useWindowSize();
  const width = size.width && size.width > 728 ? "230px" : "100%";
  return (
    <>
      <FormRow>
        {collateral === "eth" && <EthIcon style={iconStyles} />}
        {collateral === "uniswap" && <UniswapIcon style={iconStyles} />}
        <Dropdown
          setValue={setCollateral}
          variant={"coin" as DropdownVariant}
          defaultValue={{ label: "ETH", value: "eth" }}
          items={[
            {
              label: "ETH",
              value: "eth",
            },
            { label: "UNI", value: "uniswap" },
          ]}
        />
        <TextInput
          label="collateral"
          labelPlacement={"overlap" as LabelPlacement}
          placeholder="0.0"
          value={amount}
          setValue={setAmount}
          width={width}
        />
      </FormRow>
      <BalanceRow>
        <div>
          <span>Your Balance {collateralBalance}</span>{" "}
          {(collateralOnTop || !redeemForm) && <span>Max</span>}
        </div>
      </BalanceRow>
    </>
  );
};

export default Collateral;
