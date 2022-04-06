import { OrderItem } from './../src/OrderItem';
test("should create an item of request", () => {
  const orderItem = new OrderItem(1, 1000, 3);
  expect(orderItem.getTotal()).toBe(3000);
})