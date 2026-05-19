export type PaymentMethodId = "cartao_credito" | "pix" | "dinheiro";

export type PaymentProvider = "uninterbank";

export type PaymentStatus = "nao_iniciado" | "solicitado" | "aprovado" | "recusado";

export interface PaymentMethod {
	id: PaymentMethodId;
	label: string;
	description: string;
}

export interface PaymentRequest {
	amount: number;
	methodId: PaymentMethodId;
	orderId: string;
	provider: PaymentProvider;
}

export interface PaymentResponse {
	externalPaymentId: string;
	message: string;
	orderId: string;
	processedAt: string;
	provider: PaymentProvider;
	status: PaymentStatus;
}

export interface PaymentScenario {
	id: string;
	label: string;
	response: PaymentResponse;
}
