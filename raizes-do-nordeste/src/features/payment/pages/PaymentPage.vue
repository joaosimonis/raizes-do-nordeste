<template>
	<v-container class="payment-page">
		<AppHeader
			class="payment-page__header"
			subtitle="Revise os itens e escolha a forma de pagamento"
			show-back-button
			title="Pagamento"
			@back="goBack"
		/>

		<div
			v-if="hasItems"
			class="payment-page__content"
		>
			<PaymentSummaryCard
				:delivery-fee="deliveryFee"
				:items="items"
				:subtotal="totals.subtotal"
				:total="finalTotal"
				:total-items="totals.totalItems"
			/>

			<div class="payment-page__section">
				<h2 class="payment-page__section-title">Formas de pagamento</h2>

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
				:disabled="!canConfirmPayment"
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
import PaymentSummaryCard from "@/features/payment/components/PaymentSummaryCard.vue";
import { usePayment } from "@/features/payment/composables/usePayment";
import AppHeader from "@/shared/components/AppHeader.vue";

const { canConfirmPayment, confirmPayment, deliveryFee, finalTotal, goBack, hasItems, items, methods, selectPaymentMethod, selectedMethodId, totals } = usePayment();
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
		gap: 26px;
	}

	&__section {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	&__section-title {
		color: var(--color-ink-950);
		font-size: 1.35rem;
		line-height: 1.12;
		font-weight: 700;
	}

	&__methods {
		display: grid;
		gap: 14px;
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
