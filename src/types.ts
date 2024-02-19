declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };

export type CurrencyCode = Brand<string, "CurrencyCode">;

export type Rates = {
  [key in CurrencyCode]: {
    dev_stred: number;
    nazev: string;
  };
};
