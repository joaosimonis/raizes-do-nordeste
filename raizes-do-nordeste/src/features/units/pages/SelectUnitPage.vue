<template>
	<v-container class="select-unit-page">
		<AppPageHeader
			class="select-unit-page__header"
			subtitle="Escolha a unidade mais próxima"
			title="Raízes do Nordeste"
		/>

		<v-text-field
			v-model="search"
			class="select-unit-page__search"
			clearable
			density="comfortable"
			hide-details
			placeholder="Buscar unidade"
			prepend-inner-icon="mdi-magnify"
			rounded="lg"
			variant="outlined"
		/>

		<div class="select-unit-page__list">
			<UnitCard
				v-for="unit in filteredUnits"
				:key="unit.id"
				:unit="unit"
				@select="handleSelectUnit"
			/>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import type { Unit } from "@/features/units/types/unit.types";
import { useRouter } from "vue-router";
import UnitCard from "@/features/units/components/UnitCard.vue";
import { useUnits } from "@/features/units/composables/useUnits";
import AppPageHeader from "@/shared/components/AppPageHeader.vue";

const router = useRouter();
const { filteredUnits, search, unitsStore } = useUnits();

function handleSelectUnit(unit: Unit) {
	unitsStore.setSelectedUnit(unit.id);

	router.push({
		name: "menu",
		query: { unit: unit.id },
	});
}
</script>

<style scoped lang="scss">
.select-unit-page {
	min-height: 100vh;
	max-width: 860px;
	margin: 0 auto;
	padding: 16px;

	&__header {
		margin-bottom: 24px;
	}

	&__search {
		margin-bottom: 20px;
	}

	&__list {
		display: grid;
		gap: 16px;
	}
}
</style>
