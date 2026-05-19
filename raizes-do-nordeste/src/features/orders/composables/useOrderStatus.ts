import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useOrdersStore } from "@/features/orders/store/orders.store";

export const useOrderStatus = () => {
	const router = useRouter();
	const ordersStore = useOrdersStore();
	const { canAdvanceCurrentOrder, currentOrder } = storeToRefs(ordersStore);

	const goBackToStart = () => {
		router.push({ name: "select-unit" });
	};

	const advanceOrderStep = () => {
		ordersStore.advanceCurrentOrderStep();
	};

	return {
		advanceOrderStep,
		canAdvanceCurrentOrder,
		currentOrder,
		goBackToStart,
		isOrderCompleted: computed(() => currentOrder.value?.isCompleted ?? false),
	};
};
