import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useLoyaltyStore } from "@/features/loyalty/store/loyalty.store";
import { useOrdersStore } from "@/features/orders/store/orders.store";
import { usePaymentStore } from "@/features/payment/store/payment.store";
import { PAYMENT_FLOW_STEP } from "@/features/payment/types/payment.types";
import { usePromotionsStore } from "@/features/promotions/store/promotions.store";
import type { PaymentMethodId } from "@/features/payment/types/payment.types";

const DELIVERY_FEE = 8;

export const usePayment = () => {
	const router = useRouter();
	const cartStore = useCartStore();
	const loyaltyStore = useLoyaltyStore();
	const ordersStore = useOrdersStore();
	const paymentStore = usePaymentStore();
	const promotionsStore = usePromotionsStore();
	const { items, totals } = storeToRefs(cartStore);
	const { currentFlowStep, isInSelectionStep, methods, pixCode, selectedMethodId } = storeToRefs(paymentStore);
	const { identifiedMember } = storeToRefs(loyaltyStore);
	const isPixSnackbarVisible = ref(false);
	const pixSnackbarMessage = ref("Código Pix copiado.");

	const hasItems = computed(() => items.value.length > 0);
	const deliveryFee = computed(() => (hasItems.value ? DELIVERY_FEE : 0));
	const promotionalDiscountAmount = computed(() => promotionsStore.getDiscountAmountForCart(items.value, cartStore.unitId));
	const loyaltyDiscountAmount = computed(() => {
		if (!identifiedMember.value) {
			return 0;
		}

		return loyaltyStore.getDiscountPreview(totals.value.subtotal).discountAmount;
	});
	const finalTotal = computed(() => Math.max(totals.value.subtotal + deliveryFee.value - promotionalDiscountAmount.value - loyaltyDiscountAmount.value, 0));
	const canConfirmPayment = computed(() => hasItems.value && Boolean(selectedMethodId.value));
	const isCardInsertStep = computed(() => currentFlowStep.value === PAYMENT_FLOW_STEP.CARD_INSERT);
	const isCardPinStep = computed(() => currentFlowStep.value === PAYMENT_FLOW_STEP.CARD_PIN);
	const isPixStep = computed(() => currentFlowStep.value === PAYMENT_FLOW_STEP.PIX_CODE);
	const isSuccessStep = computed(() => currentFlowStep.value === PAYMENT_FLOW_STEP.SUCCESS);
	const pageSubtitle = computed(() => {
		if (isCardInsertStep.value) {
			return "Siga as instruções do terminal para concluir o pagamento com cartão";
		}

		if (isCardPinStep.value) {
			return "Pagamento em andamento com cartão";
		}

		if (isPixStep.value) {
			return "Use o código abaixo para simular o pagamento via Pix";
		}

		if (isSuccessStep.value) {
			return "Pagamento concluído com sucesso";
		}

		return "Revise os itens e escolha a forma de pagamento";
	});

	const handlePaymentMethodClick = (methodId: PaymentMethodId) => {
		if (selectedMethodId.value === methodId && isInSelectionStep.value) {
			paymentStore.openSelectedMethodFlow();
			return;
		}

		paymentStore.setSelectedMethod(methodId);
	};

	const goToSelectedPaymentFlow = () => {
		if (!canConfirmPayment.value || !isInSelectionStep.value) {
			return;
		}

		paymentStore.openSelectedMethodFlow();
	};

	const advancePaymentFlow = () => {
		paymentStore.advanceFlowStep();
	};

	const finishPayment = () => {
		if (!hasItems.value || !selectedMethodId.value) {
			return;
		}

		if (!cartStore.unitId) {
			return;
		}

		const nextOrder = ordersStore.createOrderFromCart({
			items: items.value,
			total: finalTotal.value,
			unitId: cartStore.unitId,
		});

		const paymentResponse = paymentStore.confirmMockPayment({
			amount: finalTotal.value,
			orderId: nextOrder.id,
		});

		if (paymentResponse) {
			ordersStore.setCurrentOrder(paymentResponse.orderId);
		}

		paymentStore.resetPaymentFlow();

		router.push({
			name: "order-status",
			params: { orderId: nextOrder.id },
		});
	};

	const copyPixCode = async () => {
		try {
			await navigator.clipboard.writeText(pixCode.value);
		} catch {
			pixSnackbarMessage.value = "Código Pix pronto para uso no fluxo simulado.";
		}

		isPixSnackbarVisible.value = true;
	};

	const goBack = () => {
		if (!isInSelectionStep.value) {
			paymentStore.goBackFlowStep();
			return;
		}

		router.back();
	};

	return {
		advancePaymentFlow,
		canConfirmPayment,
		copyPixCode,
		currentFlowStep,
		deliveryFee,
		finalTotal,
		finishPayment,
		goBack,
		goToSelectedPaymentFlow,
		hasItems,
		items,
		isCardInsertStep,
		isCardPinStep,
		isInSelectionStep,
		isPixSnackbarVisible,
		isPixStep,
		isSuccessStep,
		loyaltyDiscountAmount,
		methods,
		pageSubtitle,
		pixCode,
		pixSnackbarMessage,
		promotionalDiscountAmount,
		selectedMethodId,
		selectPaymentMethod: handlePaymentMethodClick,
		totals,
	};
};
