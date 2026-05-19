import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useOrdersStore } from "@/features/orders/store/orders.store";

export const useOrderStatus = () => {
	const router = useRouter();
	const ordersStore = useOrdersStore();
	const { currentOrder } = storeToRefs(ordersStore);

	const goBackToStart = () => {
		router.push({ name: "select-unit" });
	};

	return {
		currentOrder,
		goBackToStart,
	};
};
