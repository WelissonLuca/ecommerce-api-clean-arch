export class OrderCode {
  value: string;
  constructor(date:Date, sequence:number) {
    const year = date.getFullYear();
		this.value = `${year}${sequence.toString().padStart(8, '0')}`;
  }
}