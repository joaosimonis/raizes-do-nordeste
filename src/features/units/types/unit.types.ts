export interface UnitImage {
	src: string;
	alt: string;
}

export interface Unit {
	id: string;
	name: string;
	image: UnitImage;
	address: string;
	city: string;
	state: string;
	neighborhood: string;
	pickupEstimateMinutes: number;
}
