export interface CartItemInput {
	menuItemId: string;
	quantity: number;
	notes: string;
}

export interface CartItem extends CartItemInput {
	id: string;
	name: string;
	unitPrice: number;
	image?: string;
}

export interface CartState {
	unitId: string | null;
	items: CartItem[];
}

export interface CartTotals {
	subtotal: number;
	total: number;
	totalItems: number;
}
