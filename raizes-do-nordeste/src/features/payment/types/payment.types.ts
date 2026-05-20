export type PaymentMethodId = "cartao_credito" | "pix";

export type PaymentProvider = "uninterbank";

export type PaymentStatus = "nao_iniciado" | "solicitado" | "aprovado" | "recusado";

export const PAYMENT_FLOW_STEP = {
	SELECTION: "selection",
	CARD_INSERT: "card_insert",
	CARD_PIN: "card_pin",
	PIX_CODE: "pix_code",
	SUCCESS: "success",
} as const;

export type PaymentFlowStep = (typeof PAYMENT_FLOW_STEP)[keyof typeof PAYMENT_FLOW_STEP];

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
