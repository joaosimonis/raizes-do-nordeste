export type PaymentMethodId = "cartao_credito" | "pix";

export type PaymentProvider = "uninterbank";

export type PaymentStatus = "nao_iniciado" | "solicitado" | "aprovado" | "recusado";

export enum PaymentFlowStep {
	Selection = "selection",
	CardInsert = "card_insert",
	CardPin = "card_pin",
	PixCode = "pix_code",
	Success = "success",
}

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
