import type { PaymentMethod, PaymentRequest, PaymentResponse, PaymentScenario } from "@/features/payment/types/payment.types";

export const mockPaymentMethods: PaymentMethod[] = [
	{
		id: "cartao_credito",
		label: "Cartão de crédito",
		description: "Aprovação em poucos instantes pelo provedor de pagamento.",
	},
	{
		id: "pix",
		label: "Pix",
		description: "Confirmação rápida após o envio para o provedor externo.",
	},
	{
		id: "dinheiro",
		label: "Dinheiro",
		description: "Pagamento registrado para conferência no momento da retirada.",
	},
];

export const mockPaymentRequest: PaymentRequest = {
	amount: 38,
	methodId: "pix",
	orderId: "pedido-123456",
	provider: "uninterbank",
};

export const mockApprovedPaymentResponse: PaymentResponse = {
	externalPaymentId: "pay-001",
	message: "Pagamento aprovado pelo serviço externo.",
	orderId: "pedido-123456",
	processedAt: "2026-05-19T09:30:00-03:00",
	provider: "uninterbank",
	status: "aprovado",
};

export const mockDeclinedPaymentResponse: PaymentResponse = {
	externalPaymentId: "pay-002",
	message: "Pagamento recusado pelo serviço externo.",
	orderId: "pedido-123456",
	processedAt: "2026-05-19T09:31:00-03:00",
	provider: "uninterbank",
	status: "recusado",
};

export const mockRequestedPaymentResponse: PaymentResponse = {
	externalPaymentId: "pay-003",
	message: "Pagamento enviado para processamento externo.",
	orderId: "pedido-123456",
	processedAt: "2026-05-19T09:29:00-03:00",
	provider: "uninterbank",
	status: "solicitado",
};

export const mockPaymentScenarios: PaymentScenario[] = [
	{
		id: "scenario-requested",
		label: "Pagamento em processamento",
		response: mockRequestedPaymentResponse,
	},
	{
		id: "scenario-approved",
		label: "Pagamento aprovado",
		response: mockApprovedPaymentResponse,
	},
	{
		id: "scenario-declined",
		label: "Pagamento recusado",
		response: mockDeclinedPaymentResponse,
	},
];
