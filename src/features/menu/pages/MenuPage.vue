<template>
	<v-container class="menu-page">
		<AppHeader
			class="menu-page__header"
			:subtitle="selectedUnit?.name ?? 'Selecione uma unidade'"
			show-back-button
			show-cart-button
			title="Cardápio"
			@back="goBack"
			@cart="goToCart"
		/>

		<div
			v-if="activePromotions.length"
			class="menu-page__promotions"
		>
			<PromotionBanner
				v-for="promotion in activePromotions"
				:key="promotion.id"
				:promotion="promotion"
			/>
		</div>

		<v-text-field
			v-model="search"
			class="menu-page__search"
			clearable
			density="comfortable"
			hide-details
			placeholder="Buscar produto"
			prepend-inner-icon="mdi-magnify"
			rounded="lg"
			variant="outlined"
		/>

		<div class="menu-page__categories">
			<v-btn
				v-for="category in categoryOptions"
				:key="category.id"
				:variant="activeCategory === category.id ? 'flat' : 'outlined'"
				class="menu-page__category"
				color="primary"
				rounded="lg"
				:text="category.label"
				@click="setActiveCategory(category.id)"
			/>
		</div>

		<div class="menu-page__list">
			<MenuItemCard
				v-for="item in filteredMenuItems"
				:key="item.id"
				:item="item"
				@add="openProductDetails"
				@open="openProductDetails"
			/>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/features/menu/types/menu.types";
import { useRouter } from "vue-router";
import MenuItemCard from "@/features/menu/components/MenuItemCard.vue";
import { useMenu } from "@/features/menu/composables/useMenu";
import PromotionBanner from "@/features/promotions/components/PromotionBanner.vue";
import AppHeader from "@/shared/components/AppHeader.vue";

const router = useRouter();
const { activeCategory, activePromotions, categoryOptions, filteredMenuItems, menuStore, search, selectedUnit, setActiveCategory } = useMenu();

const openProductDetails = (item: MenuItem) => {
	menuStore.setSelectedMenuItem(item.id);

	router.push({
		name: "product-details",
		query: { item: item.id },
	});
};

const goBack = () => {
	router.push({ name: "select-unit" });
};

const goToCart = () => {
	router.push({ name: "cart" });
};
</script>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as *;

.menu-page {
	min-height: 100vh;
	max-width: 860px;
	margin: 0 auto;
	padding: 16px;

	&__header {
		margin-bottom: 20px;
	}

	&__search {
		margin-bottom: 16px;
	}

	&__promotions {
		display: grid;
		gap: 12px;
		margin-bottom: 16px;
	}

	&__categories {
		display: flex;
		gap: 10px;
		margin-bottom: 18px;
		overflow-x: auto;
		padding-bottom: 6px;
	}

	&__category {
		flex-shrink: 0;
		min-height: 38px;
		padding-inline: 14px;
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}

	&__list {
		display: grid;
		gap: 14px;
	}

	@include desktop {
		max-width: 1180px;
		padding: 28px 32px 40px;

		&__header {
			margin-bottom: 24px;
		}

		&__promotions,
		&__search {
			margin-bottom: 20px;
		}

		&__categories {
			margin-bottom: 24px;
		}

		&__list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 18px;
		}
	}
}
</style>
