import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CartItem } from "@/features/cart/types/cart.types";
import type { Order, OrderStatus } from "@/features/orders/types/order.types";
import { mockCurrentOrder, mockOrders } from "@/features/orders/mocks/orders.mock";

const ORDER_STATUS_FLOW: OrderStatus[] = ["pedido_confirmado", "em_preparo", "pronto_para_retirada"];
const ORDER_STATUS_MESSAGES: Record<OrderStatus, string> = {
	em_preparo: "Seu pedido está sendo preparado",
	pedido_confirmado: "Seu pedido foi confirmado e seguirá para preparo em instantes",
	pronto_para_retirada: "Seu pedido está pronto para retirada",
};

const createOrderCode = () => `#${Math.floor(100000 + Math.random() * 900000)}`;
const createOrderId = () => `order-${Date.now()}`;

export const useOrdersStore = defineStore("orders", () => {
	const orders = ref(mockOrders);
	const currentOrderId = ref<string | null>(mockCurrentOrder.id);

	const currentOrder = computed(() => orders.value.find((order) => order.id === currentOrderId.value) ?? null);
	const canAdvanceCurrentOrder = computed(() => (currentOrder.value ? !currentOrder.value.isCompleted && currentOrder.value.steps.some((step) => step.isCurrent) : false));

	const getOrderById = (orderId: string) => orders.value.find((order) => order.id === orderId) ?? null;

	const setCurrentOrder = (orderId: string) => {
		currentOrderId.value = orderId;
	};

	const createOrderFromCart = (params: { items: CartItem[]; total: number; unitId: string }) => {
		const nextOrder: Order = {
			id: createOrderId(),
			code: createOrderCode(),
			unitId: params.unitId,
			items: params.items.map((item) => ({
				id: item.id,
				name: item.name,
				notes: item.notes,
				quantity: item.quantity,
				unitPrice: item.unitPrice,
			})),
			isCompleted: false,
			status: "pedido_confirmado",
			statusMessage: ORDER_STATUS_MESSAGES.pedido_confirmado,
			estimatedPickupTime: "20-25 min",
			total: params.total,
			createdAt: new Date().toISOString(),
			steps: [
				{
					id: "pedido_confirmado",
					label: "Pedido confirmado",
					isCompleted: false,
					isCurrent: true,
				},
				{
					id: "em_preparo",
					label: "Em preparo",
					isCompleted: false,
					isCurrent: false,
				},
				{
					id: "pronto_para_retirada",
					label: "Pronto para retirada",
					isCompleted: false,
					isCurrent: false,
				},
			],
		};

		orders.value = [nextOrder, ...orders.value];
		currentOrderId.value = nextOrder.id;

		return nextOrder;
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
				statusMessage: ORDER_STATUS_MESSAGES[nextStepId],
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
		createOrderFromCart,
		currentOrder,
		currentOrderId,
		getOrderById,
		orders,
		setCurrentOrder,
	};
});
