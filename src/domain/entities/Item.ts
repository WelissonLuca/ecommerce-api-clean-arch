export class Item {
	constructor(
		readonly id: number,
		readonly description: string,
		readonly category: string,
		readonly price: number,
		readonly properties?: {
			width: number;
			height: number;
			length: number;
			weight: number;
		}
	) {}
	getVolume(): number {
		if (!this.properties) return 0;
		const { width, height, length } = this.properties;

		return ((((width / 100) * height) / 100) * length) / 100;
	}

	getDensity(): number {
		if (!this.properties) return 0;
		const { weight } = this.properties;
		return weight / this.getVolume();
	}
}
