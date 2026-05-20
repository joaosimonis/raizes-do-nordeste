import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUnitsStore } from "@/features/units/store/units.store";

export function useUnits() {
	const search = ref<string | null>("");
	const unitsStore = useUnitsStore();
	const { units } = storeToRefs(unitsStore);

	const filteredUnits = computed(() => {
		const query = (search.value ?? "").trim().toLowerCase();

		if (!query) {
			return units.value;
		}

		return units.value.filter((unit) => {
			const searchTarget = [unit.name, unit.address, unit.neighborhood, unit.city, unit.state].join(" ").toLowerCase();

			return searchTarget.includes(query);
		});
	});

	return {
		filteredUnits,
		search,
		unitsStore,
	};
}
