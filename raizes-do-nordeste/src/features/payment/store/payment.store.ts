import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockApprovedPaymentResponse, mockPaymentMethods, mockPixCode } from "@/features/payment/mocks/payment.mock";
import { PaymentFlowStep } from "@/features/payment/types/payment.types";
import type { PaymentMethodId, PaymentRequest, PaymentResponse } from "@/features/payment/types/payment.types";

export const usePaymentStore = defineStore("payment", () => {
	const methods = ref(mockPaymentMethods);
	const selectedMethodId = ref<PaymentMethodId | null>(mockPaymentMethods[0]?.id ?? null);
	const currentFlowStep = ref<PaymentFlowStep>(PaymentFlowStep.Selection);
	const lastPaymentRequest = ref<PaymentRequest | null>(null);
	const lastPaymentResponse = ref<PaymentResponse | null>(null);
	const pixCode = ref(mockPixCode);

	const selectedMethod = computed(() => methods.value.find((method) => method.id === selectedMethodId.value) ?? null);
	const isInSelectionStep = computed(() => currentFlowStep.value === PaymentFlowStep.Selection);

	const setSelectedMethod = (methodId: PaymentMethodId) => {
		selectedMethodId.value = methodId;
	};

	const openSelectedMethodFlow = () => {
		if (selectedMethodId.value === "cartao_credito") {
			currentFlowStep.value = PaymentFlowStep.CardInsert;
			return;
		}

		if (selectedMethodId.value === "pix") {
			currentFlowStep.value = PaymentFlowStep.PixCode;
		}
	};

	const advanceFlowStep = () => {
		if (currentFlowStep.value === PaymentFlowStep.CardInsert) {
			currentFlowStep.value = PaymentFlowStep.CardPin;
			return;
		}

		if (currentFlowStep.value === PaymentFlowStep.CardPin || currentFlowStep.value === PaymentFlowStep.PixCode) {
			currentFlowStep.value = PaymentFlowStep.Success;
		}
	};

	const goBackFlowStep = () => {
		if (currentFlowStep.value === PaymentFlowStep.CardPin) {
			currentFlowStep.value = PaymentFlowStep.CardInsert;
			return;
		}

		currentFlowStep.value = PaymentFlowStep.Selection;
	};

	const resetPaymentFlow = () => {
		currentFlowStep.value = PaymentFlowStep.Selection;
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
		advanceFlowStep,
		confirmMockPayment,
		currentFlowStep,
		goBackFlowStep,
		isInSelectionStep,
		lastPaymentRequest,
		lastPaymentResponse,
		methods,
		openSelectedMethodFlow,
		pixCode,
		resetPaymentFlow,
		selectedMethod,
		selectedMethodId,
		setSelectedMethod,
	};
});
