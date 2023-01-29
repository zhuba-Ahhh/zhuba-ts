import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: ["**/*test.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  // 忽略名单
  modulePathIgnorePatterns: ["<rootDir>/src/06-jest_demo"],
};

export default config;
