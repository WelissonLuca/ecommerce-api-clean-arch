import { CPF } from "../../src/domain/entities/Cpf";

it("should return valid CPF", () => {
	const cpf = new CPF("152.726.480-72");
	expect(cpf).toBeTruthy();
});
it("should try to validate an invalid cpf", () => {
	expect(() => new CPF("213.544.111-11")).toThrowError(
		new Error("Invalid CPF")
	);
});

it("should try to validate an cpf if all digits the same", () => {
	expect(() => new CPF("111.111.111-11")).toThrowError(
		new Error("Invalid CPF")
	);
});

it("should try to validate an cpf if digits that exceeds the maximum number of characters", () => {
	expect(() => new CPF("222.321.111-222222")).toThrowError(
		new Error("Invalid CPF")
	);
});

it("should try to validate an cpf if digits that less than minimum number of characters", () => {
	expect(() => new CPF("222.321")).toThrowError(new Error("Invalid CPF"));
});

it("should try to validate null value", () => {
	expect(() => new CPF(null as any)).toThrowError(new Error("Invalid CPF"));
});

it("should try to validate undefined value", () => {
	expect(() => new CPF(undefined as any)).toThrowError(
		new Error("Invalid CPF")
	);
});
