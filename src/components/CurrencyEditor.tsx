import { Autocomplete, TextField } from "@mui/material";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const NumberFormatCustom = forwardRef((props: NumericFormatProps, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      valueIsNumericString
      allowLeadingZeros={false}
      allowNegative={false}
      allowedDecimalSeparators={[".", ","]}
      decimalScale={2}
      getInputRef={ref}
      onValueChange={(values) => {
        (onChange as any)?.({
          target: {
            value: values.value,
          },
        });
      }}
    />
  );
});

const CurrencyEditor = <T extends string>({
  amount,
  currency,
  setAmount,
  setCurrency,
  currencyCodes,
  direction,
}: {
  direction: "from" | "to";
  amount: number | null;
  currency: T | null;
  currencyCodes: readonly T[];
  setAmount: (amount: number | null) => void;
  setCurrency: (currency: T | null) => void;
}) => {
  const { t } = useTranslation("common");
  return (
    <TextField
      value={amount ?? ""}
      label={t(`${direction}Amount`)}
      onChange={(e) => {
        setAmount(parseFloat(e.target.value));
      }}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        endAdornment: (
          <Autocomplete
            disablePortal
            id={`${direction}-currency`}
            title={t(`${direction}Currency`)}
            options={currencyCodes}
            value={currency}
            onChange={(_, value) => {
              setCurrency(value);
            }}
            sx={{
              width: 200,
            }}
            renderInput={(params) => (
              <TextField {...params} label={t(`${direction}Currency`)} />
            )}
          />
        ),
      }}
    />
  );
};

export default CurrencyEditor;
