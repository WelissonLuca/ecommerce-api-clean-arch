import { CPF } from "../src/Cpf";

test("should return valid CPF", () => {
  const cpf = new CPF("152.726.480-72");
	expect(cpf).toBeTruthy();
});
test("should try to validate an invalid cpf", () => {
	const cpf = new CPF("213.544.111-11");
	expect(cpf).toBeFalsy();
});

test("should try to validate an cpf if all digits the same", () => {
	const cpf = new CPF("111.111.111-11");
	expect(cpf).toBeFalsy();
});

test("should try to validate an cpf if digits that exceeds the maximum number of characters", () => {
	const cpf = new CPF("222.321.111-222222");
	expect(cpf).toBeFalsy();
});

