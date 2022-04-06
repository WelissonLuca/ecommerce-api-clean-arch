import { CPF } from './Cpf';


export class Order {
  cpf: CPF;
  constructor(cpf: string) {
    this.cpf = new CPF(cpf);
  }

	getTotal(): number {
		return 0;
	}

	
}
