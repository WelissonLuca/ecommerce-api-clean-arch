const CPF_VALID_LENGTH = 11;
const FACTOR_FIRST_VERIFIER_DIGIT = 10;
const FACTOR_SECOND_VERIFIER_DIGIT = 11;

export class Order {
  constructor(private readonly cpf: string) {
    if(!this.validate(cpf)) {
      throw new Error("Invalid CPF");
    }
  }

	getTotal(): number {
		return 0;
	}

	cleanCpf(cpf: string): string {
		return cpf.replace(/\D/g, "");
	}

	areAllDigitsEqual(cpf: string): boolean {
		const [firstDigit] = cpf;
		return [...cpf].every(digit => digit === firstDigit);
	}

	calculateDigit(cpf: string, factor: number): number {
		let total = 0;
		const splitedCpf = [...cpf];
		return splitedCpf.reduce((acc, digit) => {
			if (factor > 1) {
				total += parseInt(digit) * factor--;
			}
			acc = total % 11;
			return acc < 2 ? 0 : 11 - acc;
		}, 0);
	}

	extractVerifierDigit(cpf: string): string {
		return cpf.slice(9);
	}

	validate(rawCpf: string): boolean {
		if (!rawCpf) return false;
		const cpf = this.cleanCpf(rawCpf);
		if (cpf.length !== CPF_VALID_LENGTH) return false;
		if (this.areAllDigitsEqual(cpf)) return false;
		const firstVerifierDigit = this.calculateDigit(
			cpf,
			FACTOR_FIRST_VERIFIER_DIGIT
		);
		const secondVerifierDigit = this.calculateDigit(
			cpf,
			FACTOR_SECOND_VERIFIER_DIGIT
		);
		const verifierDigit = this.extractVerifierDigit(cpf);
		const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`;
		return verifierDigit === calculatedVerifiedDigit;
	}
}
