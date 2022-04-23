import { Coupon } from '../src/Coupon';
import { Item } from '../src/Item';
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

test("should create order an three items with valid CPF", () => {
	const cpf = "152.726.480-72";
  const order = new Order(cpf);
  order.addItem(new Item(1, "Música", "CD", 30), 3);
  order.addItem(new Item(2, "Video", "DVD", 50), 1);
  order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
	const total = order.getTotal();
	expect(total).toBe(160);
});

test("should create order an three items with discount coupon", () => {
	const cpf = "152.726.480-72";
	const order = new Order(cpf);
	order.addItem(new Item(1, "Música", "CD", 30), 3);
	order.addItem(new Item(2, "Video", "DVD", 50), 1);
  order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
  order.addCoupon(new Coupon("VALE20", 20));
	const total = order.getTotal();
	expect(total).toBe(128);
});

test("should create order an three items with expired discount coupon", () => {
	const cpf = "152.726.480-72";
	const order = new Order(cpf, new Date('2021-12-11'));
	order.addItem(new Item(1, "Música", "CD", 30), 3);
	order.addItem(new Item(2, "Video", "DVD", 50), 1);
	order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
	order.addCoupon(new Coupon("VALE20", 20, new Date('2021-12-10')));
	const total = order.getTotal();
	expect(total).toBe(160);
});