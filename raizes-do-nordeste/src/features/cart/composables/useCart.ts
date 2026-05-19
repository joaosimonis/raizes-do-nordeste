import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/features/cart/store/cart.store";

const DELIVERY_FEE = 8;

export const useCart = () => {
	const router = useRouter();
	const cartStore = useCartStore();
	const { items, totals } = storeToRefs(cartStore);
	const isSnackbarVisible = ref(false);
	const snackbarMessage = ref("");

	const hasItems = computed(() => items.value.length > 0);
	const deliveryFee = computed(() => (hasItems.value ? DELIVERY_FEE : 0));
	const finalTotal = computed(() => totals.value.subtotal + deliveryFee.value);

	const decrementItemQuantity = (cartItemId: string) => {
		const item = items.value.find((entry) => entry.id === cartItemId);

		if (!item) {
			return;
		}

		if (item.quantity === 1) {
			cartStore.removeItem(cartItemId);
			return;
		}

		cartStore.updateItemQuantity(cartItemId, item.quantity - 1);
	};

	const incrementItemQuantity = (cartItemId: string) => {
		const item = items.value.find((entry) => entry.id === cartItemId);

		if (!item) {
			return;
		}

		cartStore.updateItemQuantity(cartItemId, item.quantity + 1);
	};

	const removeItem = (cartItemId: string) => {
		const item = items.value.find((entry) => entry.id === cartItemId);

		if (!item) {
			return null;
		}

		cartStore.removeItem(cartItemId);

		return item.name;
	};

	const handleRemoveItem = (cartItemId: string) => {
		const removedItemName = removeItem(cartItemId);

		if (!removedItemName) {
			return;
		}

		snackbarMessage.value = `${removedItemName} foi removido do carrinho`;
		isSnackbarVisible.value = true;
	};

	const goBack = () => {
		router.back();
	};

	const goToPayment = () => {
		router.push({ name: "payment" });
	};

	return {
		decrementItemQuantity,
		deliveryFee,
		finalTotal,
		goBack,
		goToPayment,
		handleRemoveItem,
		hasItems,
		incrementItemQuantity,
		isSnackbarVisible,
		items,
		removeItem,
		snackbarMessage,
		totals,
	};
};
