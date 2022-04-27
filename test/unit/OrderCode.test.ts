import { OrderCode } from "../../src/domain/entities/OrderCode";

describe('OrderCode', () => { 
  it('should generate a code with the correct format', () => {
    const date = new Date();
    const sequence = 1;
    const orderCode = new OrderCode(date, sequence);
    expect(orderCode.value).toBe(`${date.getFullYear()}${sequence.toString().padStart(8, '0')}`);
  });
});