<template>
	<v-container class="product-details-page">
		<AppHeader
			class="product-details-page__header"
			:subtitle="selectedUnit?.name ?? ''"
			show-back-button
			show-cart-button
			:title="selectedMenuItem?.name ?? 'Produto'"
			@back="goBack"
			@cart="goToCart"
		/>

		<div
			v-if="selectedMenuItem"
			class="product-details-page__content"
		>
			<ProductCard :item="selectedMenuItem" />

			<div class="product-details-page__details">
				<p class="product-details-page__price">{{ formatValueToBRL(selectedMenuItem.price) }}</p>
			</div>

			<div class="product-details-page__notes">
				<p class="product-details-page__section-title">Observações</p>

				<v-textarea
					v-model="notes"
					auto-grow
					class="product-details-page__notes-input"
					hide-details
					placeholder="Ex.: Sem cebola, sem pimenta."
					rows="2"
					rounded="lg"
					variant="outlined"
				/>
			</div>

			<div class="product-details-page__purchase">
				<QuantitySelector
					:disable-decrement="!canDecreaseQuantity"
					:value="quantity"
					@decrement="decreaseQuantity"
					@increment="increaseQuantity"
				/>

				<v-btn
					block
					class="product-details-page__action"
					color="primary"
					rounded="xl"
					size="x-large"
					text="Adicionar ao carrinho"
					variant="flat"
					@click="handleAddToCart"
				/>
			</div>
		</div>

		<v-alert
			v-else
			border="start"
			class="product-details-page__empty"
			color="warning"
			text="Selecione um produto no cardápio para ver os detalhes."
			variant="tonal"
		/>

		<v-snackbar
			v-model="isSnackbarVisible"
			color="success"
			location="top"
			rounded="pill"
			timeout="3600"
		>
			{{ snackbarMessage }}
		</v-snackbar>
	</v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProductCard from "@/features/menu/components/ProductCard.vue";
import { useProductDetails } from "@/features/menu/composables/useProductDetails";
import { useUnitsStore } from "@/features/units/store/units.store";
import AppHeader from "@/shared/components/AppHeader.vue";
import QuantitySelector from "@/shared/components/QuantitySelector.vue";
import { formatValueToBRL } from "@/shared/utils/formatCurrency";

const router = useRouter();
const unitsStore = useUnitsStore();
const { selectedUnit } = storeToRefs(unitsStore);
const { addSelectedItemToCart, canDecreaseQuantity, decreaseQuantity, increaseQuantity, notes, quantity, selectedMenuItem } = useProductDetails();
const isSnackbarVisible = ref(false);
const snackbarMessage = ref("");

const goBack = () => {
	router.back();
};

const goToCart = () => {
	router.push({ name: "cart" });
};

const handleAddToCart = () => {
	const selectedItemName = addSelectedItemToCart();

	if (!selectedItemName) {
		return;
	}

	snackbarMessage.value = `${selectedItemName} foi adicionado ao carrinho`;
	isSnackbarVisible.value = true;
};
</script>

<style scoped lang="scss">
.product-details-page {
	min-height: 100vh;
	max-width: 860px;
	margin: 0 auto;
	padding: 16px;

	&__header {
		margin-bottom: 20px;
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	&__details {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__price {
		color: var(--color-ink-950);
		font-size: 2.25rem;
		line-height: 0.98;
		font-weight: 800;
	}

	&__notes {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__section-title {
		color: var(--color-ink-950);
		font-size: 1.3rem;
		line-height: 1.1;
		font-weight: 700;
	}

	&__purchase {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: 4px;
	}

	&__action {
		box-shadow: 0 12px 24px rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}

	&__empty {
		margin-top: 8px;
	}
}
</style>
