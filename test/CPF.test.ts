import { CPF } from "../src/Cpf";

test("should return valid CPF", function () {
  const cpf = new CPF("152.726.480-72");
	expect(cpf).toBeTruthy();
});
test("should try to validate an invalid cpf", function () {
	 const cpf = new CPF("111.111.111-11");
	expect(cpf).toBeFalsy();
});

