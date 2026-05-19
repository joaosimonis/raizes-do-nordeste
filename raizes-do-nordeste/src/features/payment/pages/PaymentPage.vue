<template>
	<v-container class="payment-page">
		<AppPageHeader
			class="payment-page__header"
			show-back-button
			title="Raízes do Nordeste"
			@back="goBack"
		/>

		<div
			v-if="hasItems"
			class="payment-page__content"
		>
			<div class="payment-page__section">
				<h2 class="payment-page__title">Resumo do pedido</h2>

				<v-card
					class="payment-page__summary"
					elevation="0"
					rounded="xl"
					variant="outlined"
				>
					<div
						v-for="item in items"
						:key="item.id"
						class="payment-page__summary-item"
					>
						<span class="payment-page__summary-name">{{ item.name }}</span>
						<span class="payment-page__summary-quantity">{{ item.quantity }}</span>
					</div>

					<div class="payment-page__summary-total">
						<span>Total do pedido</span>
						<span>{{ formatValueToBRL(finalTotal) }}</span>
					</div>
				</v-card>
			</div>

			<div class="payment-page__section">
				<h2 class="payment-page__title">Formas de pagamento</h2>

				<div class="payment-page__methods">
					<PaymentMethodCard
						v-for="method in methods"
						:key="method.id"
						:is-selected="selectedMethodId === method.id"
						:method="method"
						@select="selectPaymentMethod"
					/>
				</div>
			</div>

			<v-btn
				block
				class="payment-page__action"
				color="primary"
				rounded="xl"
				size="x-large"
				text="Confirmar pagamento"
				variant="flat"
				@click="confirmPayment"
			/>
		</div>

		<v-alert
			v-else
			border="start"
			class="payment-page__empty"
			color="warning"
			text="Seu carrinho está vazio. Adicione itens antes de seguir para o pagamento."
			variant="tonal"
		/>
	</v-container>
</template>

<script setup lang="ts">
import PaymentMethodCard from "@/features/payment/components/PaymentMethodCard.vue";
import { usePayment } from "@/features/payment/composables/usePayment";
import AppPageHeader from "@/shared/components/AppPageHeader.vue";
import { formatValueToBRL } from "@/shared/utils/formatCurrency";

const { confirmPayment, finalTotal, goBack, hasItems, items, methods, selectPaymentMethod, selectedMethodId } = usePayment();
</script>

<style scoped lang="scss">
.payment-page {
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

	&__section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 2rem;
		line-height: 1.08;
		font-weight: 700;
	}

	&__summary {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 20px;
		border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);
	}

	&__summary-item {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		color: var(--color-ink-950);
		font-size: 1.2rem;
		line-height: 1.25;
		font-weight: 500;
	}

	&__summary-name {
		flex: 1;
	}

	&__summary-quantity {
		min-width: 1ch;
		text-align: right;
	}

	&__summary-total {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding-top: 12px;
		border-top: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.1);
		color: var(--color-ink-950);
		font-size: 1.75rem;
		line-height: 1.05;
		font-weight: 800;
	}

	&__methods {
		display: grid;
		gap: 16px;
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
