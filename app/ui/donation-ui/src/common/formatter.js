import React from "react";
import CurrencyFormat from "react-currency-format";

export const Amt = props => {
  return (
    <CurrencyFormat
      value={props.value}
      displayType={"text"}
      thousandSeparator={true}
      thousandSpacing="2s"
      prefix={"₹ "}
    />
  );
};
