export default {
	bail: true,
	clearMocks: true,
	coverageProvider: "v8",
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.test.ts"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageReporters: ["text-summary", "lcov"],
};
