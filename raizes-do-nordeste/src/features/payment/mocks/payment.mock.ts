import type { PaymentMethod, PaymentResponse } from "@/features/payment/types/payment.types";

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
];

export const mockPixCode =
	"00020126580014br.gov.bcb.pix01368199999999990216pagamento-raizes5204000053039865406103.4065802BR5920RAIZES DO NORDESTE6009SAO PAULO62070503***6304ABCD";

export const mockApprovedPaymentResponse: PaymentResponse = {
	externalPaymentId: "pay-001",
	message: "Pagamento aprovado pelo serviço externo.",
	orderId: "order-001",
	processedAt: "2026-05-19T09:30:00-03:00",
	provider: "uninterbank",
	status: "aprovado",
};
