import { FixedFreightCalculator } from '../../src/domain/entities/FixedFreightCalculator';
import { Coupon } from "../../src/domain/entities/Coupon";
import { Item } from "../../src/domain/entities/Item";
import { Order } from "../../src/domain/entities/Order";
test("should create an empty order with valid CPF", () => {
	const cpf = "152.726.480-72";
	const order = new Order(cpf);
	const total = order.getTotal();
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
	const order = new Order(cpf, new Date("2021-12-11"));
	order.addItem(new Item(1, "Música", "CD", 30), 3);
	order.addItem(new Item(2, "Video", "DVD", 50), 1);
	order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
	order.addCoupon(new Coupon("VALE20", 20, new Date("2021-12-10")));
	const total = order.getTotal();
	expect(total).toBe(160);
});

test("should create order an three items with calculate items freight if strategy default", () => {
	const cpf = "152.726.480-72";
	const order = new Order(cpf, new Date("2021-12-11"));
	order.addItem(
		new Item(1, "Música", "BATERIA", 1000, {
			width: 100,
			height: 30,
			length: 10,
			weight: 3,
		}),
		1
	);
	order.addItem(
		new Item(2, "Livros", "ARQUITETURA LIMPA", 100, {
			width: 100,
			height: 50,
			length: 50,
			weight: 20,
		}),
		1
	);
	order.addItem(
		new Item(3, "Acessórios", "XBOX", 2500, {
			width: 10,
			height: 10,
			length: 10,
			weight: 0.9,
		}),
		3
	);
	const freight = order.getFreigth();
	expect(freight).toBe(260);
});

test("should create order an three items with calculate items freight if strategy fixed", () => {
	const cpf = "152.726.480-72";
	const order = new Order(cpf, new Date("2021-12-11"), new FixedFreightCalculator());
	order.addItem(
		new Item(1, "Música", "BATERIA", 1000, {
			width: 100,
			height: 30,
			length: 10,
			weight: 3,
		}),
		1
	);
	order.addItem(
		new Item(2, "Livros", "ARQUITETURA LIMPA", 100, {
			width: 100,
			height: 50,
			length: 50,
			weight: 20,
		}),
		1
	);
	order.addItem(
		new Item(3, "Acessórios", "XBOX", 2500, {
			width: 10,
			height: 10,
			length: 10,
			weight: 0.9,
		}),
		3
	);
	const freight = order.getFreigth();
	expect(freight).toBe(50);
});


test("should create order with code", () => {
	const cpf = "152.726.480-72";
	const order = new Order(
		cpf,
		new Date("2021-12-11"),
		new FixedFreightCalculator()
	);
	order.addItem(
		new Item(1, "Música", "BATERIA", 1000, {
			width: 100,
			height: 30,
			length: 10,
			weight: 3,
		}),
		1
	);
	order.addItem(
		new Item(2, "Livros", "ARQUITETURA LIMPA", 100, {
			width: 100,
			height: 50,
			length: 50,
			weight: 20,
		}),
		1
	);
	order.addItem(
		new Item(3, "Acessórios", "XBOX", 2500, {
			width: 10,
			height: 10,
			length: 10,
			weight: 0.9,
		}),
		3
	);
	const code = order.code.value
	expect(code).toBe("202100000001");
});