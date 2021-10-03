import { DefaultAutoCompleteOption } from "../AutoCompleteModel";

export const COUNTRIES = [
  { label: "Argentina", value: "AR", withUmlaut: "Ärgentöna" },
  { label: "Bulgaria", value: "BG", withUmlaut: "Bülgäria" },
  { label: "England", value: "GB", withUmlaut: "Ängländ" },
  { label: "Finland", value: "FI", withUmlaut: "Fünland" },
  { label: "Germany", value: "DE", withUmlaut: "Gärmöny" },
  { label: "Hungary", value: "HU", withUmlaut: "Hüngary" },
  { label: "Italy", value: "IT", withUmlaut: "Itälö" },
  { label: "Luxembourg", value: "LU", withUmlaut: "Lüxembürg" },
  { label: "Mexico", value: "MX", withUmlaut: "Mäxicö" },
  { label: "Philippines", value: "PH", withUmlaut: "Philippönäs" },
  { label: "Sweden", value: "SE", withUmlaut: "Swödän" },
  { label: "USA", value: "US", withUmlaut: "ÜSÄ" },
];

export const SEARCH_COUNTRIES = (
  searchTerm: string
): Promise<Array<DefaultAutoCompleteOption>> => {
  const regExp = new RegExp(searchTerm, "i");
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = COUNTRIES.filter(
        (country) => country.label.match(regExp) || country.value.match(regExp)
      );
      resolve(result);
    }, 800);
  });
};
