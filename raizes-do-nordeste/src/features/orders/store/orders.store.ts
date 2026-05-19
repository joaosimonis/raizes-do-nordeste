import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { OrderStatus } from "@/features/orders/types/order.types";
import { mockCurrentOrder, mockOrders } from "@/features/orders/mocks/orders.mock";

const ORDER_STATUS_FLOW: OrderStatus[] = ["pedido_confirmado", "em_preparo", "pronto_para_retirada"];

export const useOrdersStore = defineStore("orders", () => {
	const orders = ref(mockOrders);
	const currentOrderId = ref<string | null>(mockCurrentOrder.id);

	const currentOrder = computed(() => orders.value.find((order) => order.id === currentOrderId.value) ?? null);
	const canAdvanceCurrentOrder = computed(() => (currentOrder.value ? !currentOrder.value.isCompleted && currentOrder.value.steps.some((step) => step.isCurrent) : false));

	const getOrderById = (orderId: string) => orders.value.find((order) => order.id === orderId) ?? null;

	const setCurrentOrder = (orderId: string) => {
		currentOrderId.value = orderId;
	};

	const advanceCurrentOrderStep = () => {
		if (!currentOrder.value) {
			return;
		}

		const currentStepIndex = currentOrder.value.steps.findIndex((step) => step.isCurrent);

		if (currentStepIndex < 0) {
			return;
		}

		const isLastStep = currentStepIndex === currentOrder.value.steps.length - 1;

		orders.value = orders.value.map((order) => {
			if (order.id !== currentOrder.value?.id) {
				return order;
			}

			if (isLastStep) {
				return {
					...order,
					isCompleted: true,
					statusMessage: "Pedido retirado com sucesso",
					steps: order.steps.map((step) => ({
						...step,
						isCompleted: true,
						isCurrent: false,
					})),
				};
			}

			const nextStepId = ORDER_STATUS_FLOW[currentStepIndex + 1];

			return {
				...order,
				isCompleted: false,
				status: nextStepId,
				steps: order.steps.map((step, index) => ({
					...step,
					isCompleted: index < currentStepIndex + 1,
					isCurrent: index === currentStepIndex + 1,
				})),
			};
		});
	};

	return {
		advanceCurrentOrderStep,
		canAdvanceCurrentOrder,
		currentOrder,
		currentOrderId,
		getOrderById,
		orders,
		setCurrentOrder,
	};
});
