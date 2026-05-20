<template>
	<v-card
		class="payment-summary-card"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<div class="payment-summary-card__header">
			<p class="payment-summary-card__title">Resumo do pedido</p>
			<p class="payment-summary-card__subtitle">{{ totalItems }} itens selecionados</p>
		</div>

		<div
			v-for="item in items"
			:key="item.id"
			class="payment-summary-card__item"
		>
			<span class="payment-summary-card__name">{{ item.name }}</span>
			<span class="payment-summary-card__quantity">x{{ item.quantity }}</span>
		</div>

		<div class="payment-summary-card__line">
			<span>Subtotal</span>
			<span>{{ formatValueToBRL(subtotal) }}</span>
		</div>

		<div class="payment-summary-card__line">
			<span>Taxa de entrega</span>
			<span>{{ formatValueToBRL(deliveryFee) }}</span>
		</div>

		<div
			v-if="promotionDiscount > 0"
			class="payment-summary-card__line"
		>
			<span>Desconto promocional</span>
			<span>- {{ formatValueToBRL(promotionDiscount) }}</span>
		</div>

		<div
			v-if="loyaltyDiscount > 0"
			class="payment-summary-card__line"
		>
			<span>Desconto pelos pontos</span>
			<span>- {{ formatValueToBRL(loyaltyDiscount) }}</span>
		</div>

		<div class="payment-summary-card__total">
			<span>Total do pedido</span>
			<span>{{ formatValueToBRL(total) }}</span>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import type { CartItem } from "@/features/cart/types/cart.types";
import { formatValueToBRL } from "@/shared/utils/formatCurrency";

defineProps<{
	deliveryFee: number;
	items: CartItem[];
	loyaltyDiscount: number;
	promotionDiscount: number;
	subtotal: number;
	total: number;
	totalItems: number;
}>();
</script>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as *;

.payment-summary-card {
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 20px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 1.2rem;
		line-height: 1.15;
		font-weight: 700;
	}

	&__subtitle {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.35;
	}

	&__item {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		color: var(--color-ink-950);
		font-size: 1.02rem;
		line-height: 1.25;
		font-weight: 500;
	}

	&__name {
		flex: 1;
	}

	&__quantity {
		color: var(--color-stone-600);
		min-width: 2.4ch;
		text-align: right;
	}

	&__line {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		color: var(--color-stone-600);
		font-size: 0.98rem;
		line-height: 1.25;
		font-weight: 500;
	}

	&__total {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding-top: 14px;
		border-top: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.1);
		color: var(--color-ink-950);
		font-size: 1.7rem;
		line-height: 1.05;
		font-weight: 800;
	}

	@include desktop {
		padding: 22px;
	}
}
</style>
