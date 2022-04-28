import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";

describe('Connection', () => { 
    it('should connect to the database', async () => {
      const connection = PgPromiseConnectionAdapter.getInstance();
      const itemsData = await connection.query('SELECT * FROM ccca.item', []);
      expect(itemsData.length).toBeGreaterThan(0);
    });
});