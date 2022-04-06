import { Order } from './../src/Order';
test("should create an empty order with valid CPF", () => {
  const cpf = "152.726.480-72";
  const order = new Order(cpf);
  const total = order.getTotal()
  expect(total).toBe(0);
});

test("should not create an order if invalid CPF", () => {
  const cpf = "111.111.111-11";
  expect(() => new Order(cpf)).toThrowError("Invalid CPF");
});