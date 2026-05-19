import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ADVANCE_ACTION_LABELS } from "@/features/orders/mapping/orderStatus.mapping";
import { useOrdersStore } from "@/features/orders/store/orders.store";

export const useOrderStatus = () => {
	const route = useRoute();
	const router = useRouter();
	const ordersStore = useOrdersStore();
	const { canAdvanceCurrentOrder, currentOrder, currentOrderId } = storeToRefs(ordersStore);

	const routeOrderId = computed(() => {
		const orderId = route.params.orderId;

		return typeof orderId === "string" ? orderId : null;
	});

	if (routeOrderId.value && routeOrderId.value !== currentOrderId.value) {
		ordersStore.setCurrentOrder(routeOrderId.value);
	}

	const goBackToStart = () => {
		router.push({ name: "select-unit" });
	};

	const advanceOrderStep = () => {
		ordersStore.advanceCurrentOrderStep();
	};

	const advanceActionLabel = computed(() => (currentOrder.value ? ADVANCE_ACTION_LABELS[currentOrder.value.status] : "Avançar"));

	return {
		advanceOrderStep,
		advanceActionLabel,
		canAdvanceCurrentOrder,
		currentOrder,
		goBackToStart,
		isOrderCompleted: computed(() => currentOrder.value?.isCompleted ?? false),
	};
};
