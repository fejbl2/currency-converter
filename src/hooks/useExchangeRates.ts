import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Rates } from "../types";

const useExchangeRates = () => {
  const [state, setState] = useState({
    loading: true,
    rates: {} as Rates,
    error: false,
  });

  const { t } = useTranslation("common");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");

    async function doFetch() {
      try {
        const res = await axios.get<{
          kurzy: Rates;
        }>(`https://data.kurzy.cz/json/meny/b[6]den[${today}].json`);

        setState({
          loading: false,
          rates: {
            ...res.data.kurzy,
            CZK: { dev_stred: 1, nazev: t("czechCrown") }, // the API does not include CZK
          } as Rates,
          error: false,
        });
      } catch (error) {
        setState({
          loading: false,
          rates: {} as Rates,
          error: true,
        });
      }
    }

    doFetch();
  }, [t]);

  return state;
};

export default useExchangeRates;
