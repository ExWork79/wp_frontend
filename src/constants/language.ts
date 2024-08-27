import { supportedLanguages } from "../contracts";

export const DEFAULT_LANGUAGE_CODE = "en-US";

export const SUPPORTED_LANGUAGE_CODES = supportedLanguages.map(
  ({ code }) => code,
);

export { supportedLanguages };
