export class Item {
	constructor(
		readonly id: number,
		readonly description: string,
		readonly category: string,
		readonly price: number,
		readonly properties: {
			width: number;
			height: number;
			length: number;
			weight: number;
		} = { width: 0, height: 0, length: 0, weight: 0 }
	) {}
	getVolume(): number {
		const {
			properties: { height, length, weight, width },
		} = this;

		return ((((width / 100) * height) / 100) * length) / 100;
	}

	getDensity(): number {
		return this.properties.weight / this.getVolume();
	}
}
