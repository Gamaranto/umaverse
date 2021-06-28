import React from "react";

import KPIOption from "../public/placeholders/kpi-option.svg";
import SyntheticAsset from "../public/placeholders/synthetic-asset.svg";
import YieldDollar from "../public/placeholders/yield-dollar.svg";
import Option from "../public/placeholders/option.svg";
import type { Category } from "../utils/constants";

type Props = {
  category: Category;
} & React.SVGAttributes<SVGElement>;

const placeholders = {
  "KPI Options": KPIOption,
  Options: Option,
  "Synthetic Assets": SyntheticAsset,
  "Yield Dollar": YieldDollar,
};

export const SynthPlaceholderIcon: React.FC<Props> = ({
  category,
  ...delegated
}) => {
  const Component = placeholders[category];
  return <Component {...delegated} />;
};
