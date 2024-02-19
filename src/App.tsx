import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { CurrencyEditor } from "./components";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useExchangeRates } from "./hooks";
import useSetField from "./hooks/useSetField";
import { CurrencyCode } from "./types";

function App() {
  const { t } = useTranslation("common");
  const { loading, rates, error } = useExchangeRates();

  const [state, setState] = useState({
    fromAmount: null as number | null,
    fromCurrency: null as CurrencyCode | null,
    toAmount: null as number | null,
    toCurrency: null as CurrencyCode | null,
  });

  const setField = useSetField(setState);

  const setFromAmount = (amount: number | null) => {
    if (state.fromCurrency && state.toCurrency) {
      const fromRate = rates[state.fromCurrency].dev_stred;
      const toRate = rates[state.toCurrency].dev_stred;
      setField("toAmount")(amount ? (amount * fromRate) / toRate : null);
    }
    setField("fromAmount")(amount);
  };

  const setToAmount = (amount: number | null) => {
    if (state.fromCurrency && state.toCurrency) {
      const fromRate = rates[state.fromCurrency].dev_stred;
      const toRate = rates[state.toCurrency].dev_stred;
      setField("fromAmount")(amount ? (amount * toRate) / fromRate : null);
    }
    setField("toAmount")(amount);
  };

  const setFromCurrency = (currency: CurrencyCode | null) => {
    if (currency && state.toCurrency && state.fromAmount) {
      const fromRate = rates[currency].dev_stred;
      const toRate = rates[state.toCurrency].dev_stred;
      setField("toAmount")((state.fromAmount * fromRate) / toRate);
    }
    setField("fromCurrency")(currency);
  };

  const setToCurrency = (currency: CurrencyCode | null) => {
    if (currency && state.fromCurrency && state.fromAmount) {
      const fromRate = rates[state.fromCurrency].dev_stred;
      const toRate = rates[currency].dev_stred;
      setField("toAmount")((state.fromAmount * fromRate) / toRate);
    }
    setField("toCurrency")(currency);
  };

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return <div>{t("error")}</div>;
  }

  const currencyCodes = Object.keys(rates) as CurrencyCode[];

  return (
    <>
      <h1>{t("currencyConverter")}</h1>
      <LanguageSwitcher />
      <div className="input">
        <CurrencyEditor
          amount={state.fromAmount}
          currency={state.fromCurrency}
          currencyCodes={currencyCodes}
          setAmount={setFromAmount}
          setCurrency={setFromCurrency}
          direction="from"
        />
      </div>
      <div className="input">
        <CurrencyEditor
          amount={state.toAmount}
          currency={state.toCurrency}
          currencyCodes={currencyCodes}
          setAmount={setToAmount}
          setCurrency={setToCurrency}
          direction="to"
        />
      </div>
      <div className="card">
        <p>{t("hint")}</p>
      </div>
    </>
  );
}

export default App;
