import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useOrdersStore } from "@/features/orders/store/orders.store";
import { mockPaymentRequest } from "@/features/payment/mocks/payment.mock";
import { usePaymentStore } from "@/features/payment/store/payment.store";
import type { PaymentMethodId } from "@/features/payment/types/payment.types";

const DELIVERY_FEE = 8;

export const usePayment = () => {
	const router = useRouter();
	const cartStore = useCartStore();
	const ordersStore = useOrdersStore();
	const paymentStore = usePaymentStore();
	const { items, totals } = storeToRefs(cartStore);
	const { methods, selectedMethodId } = storeToRefs(paymentStore);

	const hasItems = computed(() => items.value.length > 0);
	const deliveryFee = computed(() => (hasItems.value ? DELIVERY_FEE : 0));
	const finalTotal = computed(() => totals.value.subtotal + deliveryFee.value);

	const selectPaymentMethod = (methodId: PaymentMethodId) => {
		paymentStore.setSelectedMethod(methodId);
	};

	const confirmPayment = () => {
		if (!hasItems.value || !selectedMethodId.value) {
			return;
		}

		const paymentResponse = paymentStore.confirmMockPayment({
			amount: finalTotal.value,
			orderId: mockPaymentRequest.orderId,
		});

		if (paymentResponse) {
			ordersStore.setCurrentOrder(paymentResponse.orderId);
		}

		router.push({ name: "order-status" });
	};

	const goBack = () => {
		router.back();
	};

	return {
		confirmPayment,
		deliveryFee,
		finalTotal,
		goBack,
		hasItems,
		items,
		methods,
		selectPaymentMethod,
		selectedMethodId,
		totals,
	};
};
