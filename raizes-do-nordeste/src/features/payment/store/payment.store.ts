import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockApprovedPaymentResponse, mockPaymentMethods, mockPixCode } from "@/features/payment/mocks/payment.mock";
import { PAYMENT_FLOW_STEP } from "@/features/payment/types/payment.types";
import type { PaymentFlowStep, PaymentMethodId, PaymentRequest, PaymentResponse } from "@/features/payment/types/payment.types";

export const usePaymentStore = defineStore("payment", () => {
	const methods = ref(mockPaymentMethods);
	const selectedMethodId = ref<PaymentMethodId | null>(mockPaymentMethods[0]?.id ?? null);
	const currentFlowStep = ref<PaymentFlowStep>(PAYMENT_FLOW_STEP.SELECTION);
	const lastPaymentRequest = ref<PaymentRequest | null>(null);
	const lastPaymentResponse = ref<PaymentResponse | null>(null);
	const pixCode = ref(mockPixCode);

	const selectedMethod = computed(() => methods.value.find((method) => method.id === selectedMethodId.value) ?? null);
	const isInSelectionStep = computed(() => currentFlowStep.value === PAYMENT_FLOW_STEP.SELECTION);

	const setSelectedMethod = (methodId: PaymentMethodId) => {
		selectedMethodId.value = methodId;
	};

	const openSelectedMethodFlow = () => {
		if (selectedMethodId.value === "cartao_credito") {
			currentFlowStep.value = PAYMENT_FLOW_STEP.CARD_INSERT;
			return;
		}

		if (selectedMethodId.value === "pix") {
			currentFlowStep.value = PAYMENT_FLOW_STEP.PIX_CODE;
		}
	};

	const advanceFlowStep = () => {
		if (currentFlowStep.value === PAYMENT_FLOW_STEP.CARD_INSERT) {
			currentFlowStep.value = PAYMENT_FLOW_STEP.CARD_PIN;
			return;
		}

		if (currentFlowStep.value === PAYMENT_FLOW_STEP.CARD_PIN || currentFlowStep.value === PAYMENT_FLOW_STEP.PIX_CODE) {
			currentFlowStep.value = PAYMENT_FLOW_STEP.SUCCESS;
		}
	};

	const goBackFlowStep = () => {
		if (currentFlowStep.value === PAYMENT_FLOW_STEP.CARD_PIN) {
			currentFlowStep.value = PAYMENT_FLOW_STEP.CARD_INSERT;
			return;
		}

		currentFlowStep.value = PAYMENT_FLOW_STEP.SELECTION;
	};

	const resetPaymentFlow = () => {
		currentFlowStep.value = PAYMENT_FLOW_STEP.SELECTION;
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
