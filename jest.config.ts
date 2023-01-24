import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: ["**/*test.{js,jsx,ts,tsx}", "!**/node_modules/**"],
};

export default config;
