<template>
	<v-container class="payment-page">
		<AppHeader
			class="payment-page__header"
			:subtitle="pageSubtitle"
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
				:loyalty-discount="loyaltyDiscountAmount"
				:promotion-discount="promotionalDiscountAmount"
				:subtotal="totals.subtotal"
				:total="finalTotal"
				:total-items="totals.totalItems"
			/>

			<div class="payment-page__main">
				<div class="payment-page__section">
					<template v-if="isInSelectionStep">
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
					</template>

					<CardPaymentStep
						v-else-if="isCardInsertStep"
						action-text="Continuar"
						description="Use o cartão físico ou a aproximação para simular o envio do pagamento ao terminal externo."
						icon="mdi-credit-card-wireless-outline"
						title="Insira ou aproxime o cartão"
						@next="advancePaymentFlow"
					/>

					<CardPaymentStep
						v-else-if="isCardPinStep"
						action-text="Confirmar pagamento"
						description="Digite sua senha para confirmar o pagamento."
						icon="mdi-dots-grid"
						title="Digite a senha"
						@next="advancePaymentFlow"
					/>

					<PixPaymentStep
						v-else-if="isPixStep"
						:pix-code="pixCode"
						@copy="copyPixCode"
						@next="advancePaymentFlow"
					/>

					<PaymentSuccessStep
						v-else-if="isSuccessStep"
						@finish="finishPayment"
					/>
				</div>

				<v-btn
					v-if="isInSelectionStep"
					block
					class="payment-page__action"
					color="primary"
					:disabled="!canConfirmPayment"
					rounded="xl"
					size="x-large"
					text="Continuar com o pagamento"
					variant="flat"
					@click="goToSelectedPaymentFlow"
				/>
			</div>

			<v-snackbar
				v-model="isPixSnackbarVisible"
				class="payment-page__snackbar"
				color="info"
				location="bottom"
				rounded="pill"
				timeout="3200"
			>
				{{ pixSnackbarMessage }}
			</v-snackbar>
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
import CardPaymentStep from "@/features/payment/steps/CardPaymentStep.vue";
import PaymentSuccessStep from "@/features/payment/steps/PaymentSuccessStep.vue";
import PixPaymentStep from "@/features/payment/steps/PixPaymentStep.vue";
import { usePayment } from "@/features/payment/composables/usePayment";
import AppHeader from "@/shared/components/AppHeader.vue";

const {
	advancePaymentFlow,
	canConfirmPayment,
	copyPixCode,
	deliveryFee,
	finalTotal,
	finishPayment,
	goBack,
	goToSelectedPaymentFlow,
	hasItems,
	isCardInsertStep,
	isCardPinStep,
	isInSelectionStep,
	isPixSnackbarVisible,
	isPixStep,
	isSuccessStep,
	items,
	loyaltyDiscountAmount,
	methods,
	pageSubtitle,
	pixCode,
	pixSnackbarMessage,
	promotionalDiscountAmount,
	selectPaymentMethod,
	selectedMethodId,
	totals,
} = usePayment();
</script>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as *;

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

	&__main {
		display: flex;
		flex-direction: column;
		gap: 18px;
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

	:deep(.payment-page__snackbar) {
		margin-bottom: 20px;
	}

	&__empty {
		margin-top: 8px;
	}

	@include desktop {
		max-width: 1220px;
		padding: 28px 32px 40px;

		&__header {
			margin-bottom: 28px;
		}

		&__content {
			display: grid;
			grid-template-columns: minmax(320px, 0.78fr) minmax(0, 1fr);
			gap: 28px 32px;
			align-items: start;
		}

		&__main {
			grid-column: 2;
			gap: 20px;
		}

		&__action {
			align-self: stretch;
		}
	}
}
</style>
