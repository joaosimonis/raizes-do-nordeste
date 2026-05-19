import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockCurrentOrder, mockOrders } from "@/features/orders/mocks/orders.mock";

export const useOrdersStore = defineStore("orders", () => {
	const orders = ref(mockOrders);
	const currentOrderId = ref<string | null>(mockCurrentOrder.id);

	const currentOrder = computed(
		() => orders.value.find((order) => order.id === currentOrderId.value) ?? null,
	);

	const getOrderById = (orderId: string) => orders.value.find((order) => order.id === orderId) ?? null;

	const setCurrentOrder = (orderId: string) => {
		currentOrderId.value = orderId;
	};

	return {
		currentOrder,
		currentOrderId,
		getOrderById,
		orders,
		setCurrentOrder,
	};
});
