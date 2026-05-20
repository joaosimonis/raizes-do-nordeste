import type { MenuCategoryId } from "@/features/menu/types/menu.types";
import { storeToRefs } from "pinia";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@/features/menu/store/menu.store";
import { usePromotionsStore } from "@/features/promotions/store/promotions.store";
import { useUnitsStore } from "@/features/units/store/units.store";

type MenuFilterCategory = MenuCategoryId | "todos";

export function useMenu() {
	const route = useRoute();
	const menuStore = useMenuStore();
	const promotionsStore = usePromotionsStore();
	const unitsStore = useUnitsStore();

	const { categories, items } = storeToRefs(menuStore);
	const { selectedUnit, selectedUnitId } = storeToRefs(unitsStore);

	const search = ref<string | null>("");
	const activeCategory = ref<MenuFilterCategory>("todos");

	watchEffect(() => {
		const routeUnitId = typeof route.query.unit === "string" ? route.query.unit : null;

		if (!routeUnitId) {
			return;
		}

		if (selectedUnitId.value === routeUnitId) {
			return;
		}

		const unit = unitsStore.getUnitById(routeUnitId);

		if (unit) {
			unitsStore.setSelectedUnit(unit.id);
		}
	});

	const categoryOptions = computed(() => [{ id: "todos" as const, label: "Todos" }, ...categories.value]);
	const activePromotions = computed(() => promotionsStore.getActivePromotionsByUnitId(selectedUnitId.value));

	const filteredMenuItems = computed(() => {
		const query = (search.value ?? "").trim().toLowerCase();

		return items.value.filter((item) => {
			const belongsToUnit = selectedUnitId.value ? item.unitIds.includes(selectedUnitId.value) : true;

			const belongsToCategory = activeCategory.value === "todos" ? true : item.categoryId === activeCategory.value;

			const matchesSearch = query ? item.name.toLowerCase().includes(query) : true;

			return belongsToUnit && belongsToCategory && matchesSearch;
		});
	});

	function setActiveCategory(categoryId: MenuFilterCategory) {
		activeCategory.value = categoryId;
	}

	return {
		activeCategory,
		activePromotions,
		categoryOptions,
		filteredMenuItems,
		menuStore,
		search,
		selectedUnit,
		setActiveCategory,
	};
}
