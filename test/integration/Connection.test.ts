import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";

describe('Connection', () => { 
    it('should connect to the database', async () => {
      const connection = new PgPromiseConnectionAdapter();
      const itemsData = await connection.query('SELECT * FROM ccca.item', []);
      expect(itemsData.length).toBeGreaterThan(0);
    });
});