import { Autocomplete, AutocompleteProps, Box, TextField } from "@mui/material";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  AvailableLanguage,
  availableLanguages,
  languageToFlagUrl,
} from "../i18n";

export const LanguageSwitcher = (
  props: Partial<AutocompleteProps<AvailableLanguage, false, true, false>>
) => {
  const { t } = useTranslation("common");

  const currentLanguage = i18next.language as AvailableLanguage;

  return (
    <Autocomplete
      {...props}
      disablePortal
      disableClearable
      id="language-switcher"
      title={t("chooseLanguage")}
      options={availableLanguages}
      value={currentLanguage}
      onChange={(_, value) => {
        i18next.changeLanguage(value ?? undefined);
      }}
      sx={{
        width: 200,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("chooseLanguage")}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <img
                loading="lazy"
                width="20"
                src={languageToFlagUrl[currentLanguage]}
              />
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img loading="lazy" width="20" src={languageToFlagUrl[option]} />
          {option}
        </Box>
      )}
    />
  );
};
