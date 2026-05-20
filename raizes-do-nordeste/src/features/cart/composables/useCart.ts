import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useLoyaltyStore } from "@/features/loyalty/store/loyalty.store";
import { usePromotionsStore } from "@/features/promotions/store/promotions.store";
import { usePrivacyStore } from "@/features/privacy/store/privacy.store";
import type { PrivacyConsentId } from "@/features/privacy/types/privacy.types";

const DELIVERY_FEE = 8;

export const useCart = () => {
	const router = useRouter();
	const cartStore = useCartStore();
	const loyaltyStore = useLoyaltyStore();
	const promotionsStore = usePromotionsStore();
	const privacyStore = usePrivacyStore();
	const { items, totals } = storeToRefs(cartStore);
	const { currentPoints, enrollment, identifiedMember, normalizedPhone, program } = storeToRefs(loyaltyStore);
	const { consentOptions, consentState, hasAcceptedRequiredConsents, terms } = storeToRefs(privacyStore);
	const isSnackbarVisible = ref(false);
	const isLoyaltyDialogVisible = ref(false);
	const snackbarMessage = ref("");
	const isRemoveDialogVisible = ref(false);
	const isPrivacyDialogVisible = ref(false);
	const pendingRemoveItemId = ref<string | null>(null);
	const pendingRemoveItemName = ref("");

	const hasItems = computed(() => items.value.length > 0);
	const deliveryFee = computed(() => (hasItems.value ? DELIVERY_FEE : 0));
	const promotionalDiscountAmount = computed(() => promotionsStore.getDiscountAmountForCart(items.value, cartStore.unitId));
	const acceptedConsentIds = computed(() => consentState.value.acceptedConsentIds);
	const hasTypedLoyaltyPhone = computed(() => normalizedPhone.value.length >= 10);
	const loyaltyMemberFound = computed(() => Boolean(identifiedMember.value));
	const showLoyaltyNotFoundMessage = computed(() => hasTypedLoyaltyPhone.value && !loyaltyMemberFound.value);
	const loyaltyDiscountPreview = computed(() => {
		if (!loyaltyMemberFound.value) {
			return null;
		}

		return loyaltyStore.getDiscountPreview(totals.value.subtotal);
	});
	const loyaltyDiscountAmount = computed(() => loyaltyDiscountPreview.value?.discountAmount ?? 0);
	const finalTotal = computed(() => Math.max(totals.value.subtotal + deliveryFee.value - promotionalDiscountAmount.value - loyaltyDiscountAmount.value, 0));
	const loyaltyDiscountMessage = computed(() => {
		if (!loyaltyMemberFound.value) {
			return "";
		}

		if (!enrollment.value.participate) {
			return "Ative a opção acima para aplicar o desconto disponível neste pedido.";
		}

		if (!loyaltyDiscountPreview.value?.appliedDiscountTier) {
			return "Seu saldo atual ainda não libera desconto para este pedido.";
		}

		return `Desconto aplicado: ${loyaltyDiscountPreview.value.appliedDiscountTier.discountPercentage}% neste pedido.`;
	});

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
		const item = items.value.find((entry) => entry.id === cartItemId);

		if (!item) {
			return;
		}

		pendingRemoveItemId.value = cartItemId;
		pendingRemoveItemName.value = item.name;
		isRemoveDialogVisible.value = true;
	};

	const cancelRemoveItem = () => {
		pendingRemoveItemId.value = null;
		pendingRemoveItemName.value = "";
		isRemoveDialogVisible.value = false;
	};

	const confirmRemoveItem = () => {
		if (!pendingRemoveItemId.value) {
			return;
		}

		const removedItemName = removeItem(pendingRemoveItemId.value);

		cancelRemoveItem();

		if (!removedItemName) {
			return;
		}

		snackbarMessage.value = `${removedItemName} foi removido do carrinho`;
		isSnackbarVisible.value = true;
	};

	const goBack = () => {
		router.back();
	};

	const openLoyaltyDialog = () => {
		isLoyaltyDialogVisible.value = true;
	};

	const openPrivacyDialog = () => {
		isPrivacyDialogVisible.value = true;
	};

	const closePrivacyDialog = () => {
		isPrivacyDialogVisible.value = false;
	};

	const handlePrivacyAccept = (consentIds: PrivacyConsentId[]) => {
		privacyStore.acceptConsents(consentIds);
		closePrivacyDialog();
		router.push({ name: "payment" });
	};

	const goToPayment = () => {
		if (!hasAcceptedRequiredConsents.value) {
			openPrivacyDialog();
			return;
		}

		router.push({ name: "payment" });
	};

	return {
		acceptedConsentIds,
		cancelRemoveItem,
		closePrivacyDialog,
		confirmRemoveItem,
		currentPoints,
		decrementItemQuantity,
		deliveryFee,
		enrollment,
		finalTotal,
		goBack,
		goToPayment,
		handleRemoveItem,
		handlePrivacyAccept,
		hasItems,
		hasAcceptedRequiredConsents,
		hasTypedLoyaltyPhone,
		identifiedMember,
		incrementItemQuantity,
		isLoyaltyDialogVisible,
		isPrivacyDialogVisible,
		isRemoveDialogVisible,
		isSnackbarVisible,
		items,
		loyaltyDiscountAmount,
		loyaltyDiscountMessage,
		loyaltyMemberFound,
		openLoyaltyDialog,
		openPrivacyDialog,
		pendingRemoveItemName,
		program,
		promotionalDiscountAmount,
		removeItem,
		setLoyaltyParticipate: loyaltyStore.setParticipate,
		setLoyaltyPhone: loyaltyStore.setPhone,
		showLoyaltyNotFoundMessage,
		snackbarMessage,
		consentOptions,
		terms,
		totals,
	};
};
