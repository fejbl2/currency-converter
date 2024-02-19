declare const brand: unique symbol;

type Brand<T> = T & { [brand]: never };

export type CurrencyCode = Brand<string>;

export type Rates = {
  [key in CurrencyCode]: {
    dev_stred: number;
    nazev: string;
  };
};
