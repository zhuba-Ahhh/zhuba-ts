export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.(js|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+.svg$": "<rootDir>/svg-transform.js",
  },
  moduleNameMapper: {
    // 有使用 sass 需求可换成 ^\.(css|less|sass|scss)$
    ".(css|less)$": "identity-obj-proxy",
  },
  // 将指定的配置文件，在安装测试框架之后，执行测试代码本身之前运行
  setupFilesAfterEnv: [
    "<rootDir>/jest-dom-setup.js",
    "<rootDir>/node_modules/jest-enzyme/lib/index.js",
  ],
  setupFiles: ["<rootDir>/enzyme_setup.ts"],
};
