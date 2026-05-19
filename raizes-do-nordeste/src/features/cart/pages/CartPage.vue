<template>
	<v-container class="cart-page">
		<AppPageHeader
			class="cart-page__header"
			show-back-button
			title="Raízes do Nordeste"
			@back="goBack"
		/>

		<div
			v-if="hasItems"
			class="cart-page__content"
		>
			<div class="cart-page__heading">
				<h2 class="cart-page__title">Seu carrinho ({{ totals.totalItems }} itens)</h2>
			</div>

			<div class="cart-page__list">
				<CartItemCard
					v-for="item in items"
					:key="item.id"
					:item="item"
					@decrement="decrementItemQuantity"
					@increment="incrementItemQuantity"
					@remove="handleRemoveItem"
				/>
			</div>

			<v-card
				class="cart-page__summary"
				elevation="0"
				rounded="xl"
				variant="outlined"
			>
				<div class="cart-page__summary-line">
					<span>Subtotal:</span>
					<span>{{ formatValueToBRL(totals.subtotal) }}</span>
				</div>

				<div class="cart-page__summary-line">
					<span>Taxa de entrega:</span>
					<span>{{ formatValueToBRL(deliveryFee) }}</span>
				</div>

				<div class="cart-page__summary-total">
					<span>Total:</span>
					<span>{{ formatValueToBRL(finalTotal) }}</span>
				</div>
			</v-card>

			<v-btn
				block
				class="cart-page__action"
				color="primary"
				rounded="xl"
				size="x-large"
				text="Continuar para pagamento"
				variant="flat"
				@click="goToCheckout"
			/>
		</div>

		<v-alert
			v-else
			border="start"
			class="cart-page__empty"
			color="warning"
			text="Seu carrinho está vazio. Adicione itens no cardápio para continuar."
			variant="tonal"
		/>
	</v-container>

	<v-snackbar
		v-model="isSnackbarVisible"
		color="info"
		location="bottom"
		rounded="pill"
		timeout="2500"
	>
		{{ snackbarMessage }}
	</v-snackbar>
</template>

<script setup lang="ts">
import CartItemCard from "@/features/cart/components/CartItemCard.vue";
import { useCart } from "@/features/cart/composables/useCart";
import AppPageHeader from "@/shared/components/AppPageHeader.vue";
import { formatValueToBRL } from "@/shared/utils/formatCurrency";

const { decrementItemQuantity, deliveryFee, finalTotal, goBack, goToCheckout, handleRemoveItem, hasItems, incrementItemQuantity, isSnackbarVisible, items, snackbarMessage, totals } = useCart();
</script>

<style scoped lang="scss">
.cart-page {
	min-height: 100vh;
	max-width: 860px;
	margin: 0 auto;
	padding: 16px;

	&__header {
		margin-bottom: 24px;
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 2rem;
		line-height: 1.08;
		font-weight: 700;
	}

	&__list {
		display: grid;
		gap: 16px;
	}

	&__summary {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 20px;
		border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);
	}

	&__summary-line,
	&__summary-total {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		color: var(--color-ink-950);
	}

	&__summary-line {
		font-size: 1.15rem;
		line-height: 1.25;
		font-weight: 500;
	}

	&__summary-total {
		font-size: 1.95rem;
		line-height: 1.05;
		font-weight: 800;
	}

	&__action {
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}

	&__empty {
		margin-top: 8px;
	}
}
</style>
