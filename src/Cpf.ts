const CPF_VALID_LENGTH = 11;
const FACTOR_FIRST_VERIFIER_DIGIT = 10;
const FACTOR_SECOND_VERIFIER_DIGIT = 11;

export class CPF {
  value: string;
	constructor(value: string) {
		if (!this.validate(value)) throw new Error("Invalid CPF");
    this.value = value;
	}

	private validate(rawCpf: string) {
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

	private cleanCpf(cpf: string): string {
		return cpf.replace(/\D/g, "");
	}

	private areAllDigitsEqual(cpf: string): boolean {
		const [firstDigit] = cpf;
		return [...cpf].every(digit => digit === firstDigit);
	}

	private calculateDigit(cpf: string, factor: number): number {
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

	private extractVerifierDigit(cpf: string): string {
		return cpf.slice(9);
	}
}
