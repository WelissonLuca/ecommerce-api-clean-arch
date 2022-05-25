import express, { Request, Response } from "express";

import { Http } from "./http";

export class ExpressAdapter implements Http {
  private app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await fn(req.params, req.body);

      return res.json(output);
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`Server running on port ${port}`));
  }
}
