import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockPromotions } from "@/features/promotions/mocks/promotions.mock";
import type { Promotion } from "@/features/promotions/types/promotion.types";
import type { CartItem } from "@/features/cart/types/cart.types";

export const usePromotionsStore = defineStore("promotions", () => {
	const promotions = ref(mockPromotions);

	const activePromotions = computed(() => promotions.value.filter((promotion) => promotion.isActive));

	const getActivePromotionsByUnitId = (unitId: string | null): Promotion[] => {
		if (!unitId) {
			return [];
		}

		return activePromotions.value.filter((promotion) => promotion.unitIds.includes(unitId));
	};

	const getDiscountAmountForCart = (items: CartItem[], unitId: string | null) => {
		const promotionsByUnit = getActivePromotionsByUnitId(unitId);

		return Number(
			promotionsByUnit
				.reduce((totalDiscount, promotion) => {
					if (promotion.type !== "percentage_discount") {
						return totalDiscount;
					}

					const promotionDiscount = items.reduce((itemsDiscount, item) => {
						if (!promotion.menuItemIds.includes(item.menuItemId)) {
							return itemsDiscount;
						}

						return itemsDiscount + (item.unitPrice * item.quantity * promotion.discountValue) / 100;
					}, 0);

					return totalDiscount + promotionDiscount;
				}, 0)
				.toFixed(2)
		);
	};

	return {
		activePromotions,
		getActivePromotionsByUnitId,
		getDiscountAmountForCart,
		promotions,
	};
});
