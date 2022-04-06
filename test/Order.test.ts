import { Order } from './../src/Order';
test("should create an empty order with valid CPF", () => {
  const cpf = "152.726.480-72";
  const order = new Order(cpf);
  const total = order.getTotal()
  expect(total).toBe(0);
});