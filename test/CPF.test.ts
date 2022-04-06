import { CPF } from "../src/Cpf";

test("should return valid CPF", function () {
  const cpf = new CPF("152.726.480-72");
	expect(cpf).toBeTruthy();
});
