import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockApprovedPaymentResponse, mockPaymentMethods } from "@/features/payment/mocks/payment.mock";
import type { PaymentMethodId, PaymentRequest, PaymentResponse } from "@/features/payment/types/payment.types";

export const usePaymentStore = defineStore("payment", () => {
	const methods = ref(mockPaymentMethods);
	const selectedMethodId = ref<PaymentMethodId | null>(mockPaymentMethods[0]?.id ?? null);
	const lastPaymentRequest = ref<PaymentRequest | null>(null);
	const lastPaymentResponse = ref<PaymentResponse | null>(null);

	const selectedMethod = computed(() => methods.value.find((method) => method.id === selectedMethodId.value) ?? null);

	const setSelectedMethod = (methodId: PaymentMethodId) => {
		selectedMethodId.value = methodId;
	};

	const confirmMockPayment = (params: { amount: number; orderId: string }) => {
		if (!selectedMethodId.value) {
			return null;
		}

		lastPaymentRequest.value = {
			amount: params.amount,
			methodId: selectedMethodId.value,
			orderId: params.orderId,
			provider: mockApprovedPaymentResponse.provider,
		};

		lastPaymentResponse.value = {
			...mockApprovedPaymentResponse,
			orderId: params.orderId,
			processedAt: new Date().toISOString(),
		};

		return lastPaymentResponse.value;
	};

	return {
		confirmMockPayment,
		lastPaymentRequest,
		lastPaymentResponse,
		methods,
		selectedMethod,
		selectedMethodId,
		setSelectedMethod,
	};
});
