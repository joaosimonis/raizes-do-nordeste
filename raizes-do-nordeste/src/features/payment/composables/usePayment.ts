import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useOrdersStore } from "@/features/orders/store/orders.store";
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
	const canConfirmPayment = computed(() => hasItems.value && Boolean(selectedMethodId.value));

	const selectPaymentMethod = (methodId: PaymentMethodId) => {
		paymentStore.setSelectedMethod(methodId);
	};

	const confirmPayment = () => {
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

		router.push({
			name: "order-status",
			params: { orderId: nextOrder.id },
		});
	};

	const goBack = () => {
		router.back();
	};

	return {
		canConfirmPayment,
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
