import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockMenuCategories, mockMenuItems } from "@/features/menu/mocks/menu.mock";
import type { MenuItemSelectionState } from "@/features/menu/types/menu.types";

export const useMenuStore = defineStore("menu", () => {
	const categories = ref(mockMenuCategories);
	const items = ref(mockMenuItems);
	const selectedMenuItemState = ref<MenuItemSelectionState>({
		itemId: null,
		quantity: 1,
		notes: "",
	});

	const selectedMenuItem = computed(() => (selectedMenuItemState.value.itemId ? (items.value.find((item) => item.id === selectedMenuItemState.value.itemId) ?? null) : null));

	const getMenuItemById = (itemId: string) => items.value.find((item) => item.id === itemId) ?? null;

	const setSelectedMenuItem = (itemId: string) => {
		if (selectedMenuItemState.value.itemId === itemId) {
			return;
		}

		selectedMenuItemState.value = {
			itemId,
			quantity: 1,
			notes: "",
		};
	};

	const setSelectedMenuItemQuantity = (quantity: number) => {
		selectedMenuItemState.value = {
			...selectedMenuItemState.value,
			quantity: Math.max(1, quantity),
		};
	};

	const setSelectedMenuItemNotes = (notes: string) => {
		selectedMenuItemState.value = {
			...selectedMenuItemState.value,
			notes,
		};
	};

	const clearSelectedMenuItem = () => {
		selectedMenuItemState.value = {
			itemId: null,
			quantity: 1,
			notes: "",
		};
	};

	return {
		categories,
		clearSelectedMenuItem,
		getMenuItemById,
		items,
		selectedMenuItem,
		selectedMenuItemState,
		setSelectedMenuItemNotes,
		setSelectedMenuItemQuantity,
		setSelectedMenuItem,
	};
});
