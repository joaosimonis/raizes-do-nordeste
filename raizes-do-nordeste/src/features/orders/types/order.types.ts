export type OrderStatus = "pedido_confirmado" | "em_preparo" | "pronto_para_retirada" | "retirado";

export interface OrderItem {
	id: string;
	name: string;
	quantity: number;
	unitPrice: number;
	notes?: string;
}

export interface OrderStatusStep {
	id: OrderStatus;
	label: string;
	isCompleted: boolean;
	isCurrent: boolean;
}

export interface Order {
	id: string;
	code: string;
	unitId: string;
	items: OrderItem[];
	status: OrderStatus;
	statusMessage: string;
	estimatedPickupTime: string;
	total: number;
	createdAt: string;
	steps: OrderStatusStep[];
}
