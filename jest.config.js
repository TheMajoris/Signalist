module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>"],
    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    collectCoverageFrom: [
        "database/**/*.ts",
        "!database/**/*.test.ts",
        "!database/**/*.spec.ts",
    ],
    setupFiles: ["<rootDir>/jest.setup.js"],
};
