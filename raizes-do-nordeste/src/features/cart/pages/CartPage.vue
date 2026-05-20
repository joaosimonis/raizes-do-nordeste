<template>
	<v-container class="cart-page">
		<AppHeader
			class="cart-page__header"
			:subtitle="`${totals.totalItems} itens no pedido`"
			show-back-button
			title="Carrinho"
			@back="goBack"
		/>

		<div
			v-if="hasItems"
			class="cart-page__content"
		>
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

				<div
					v-if="promotionalDiscountAmount > 0"
					class="cart-page__summary-line"
				>
					<span>Desconto promocional:</span>
					<span>- {{ formatValueToBRL(promotionalDiscountAmount) }}</span>
				</div>

				<div
					v-if="enrollment.participate && loyaltyMemberFound"
					class="cart-page__summary-line"
				>
					<span>Desconto pelos pontos:</span>
					<span>- {{ formatValueToBRL(loyaltyDiscountAmount) }}</span>
				</div>

				<div class="cart-page__summary-total">
					<span>Total:</span>
					<span>{{ formatValueToBRL(finalTotal) }}</span>
				</div>
			</v-card>

			<LoyaltyEnrollmentCard
				:current-points="currentPoints"
				:discount-message="loyaltyDiscountMessage"
				:has-typed-phone="hasTypedLoyaltyPhone"
				:member-found="loyaltyMemberFound"
				:participate="enrollment.participate"
				:phone="enrollment.phone"
				:show-not-found-message="showLoyaltyNotFoundMessage"
				@open-info="openLoyaltyDialog"
				@update:participate="setLoyaltyParticipate"
				@update:phone="setLoyaltyPhone"
			/>

			<v-card
				class="cart-page__privacy"
				elevation="0"
				rounded="xl"
				variant="outlined"
			>
				<div class="cart-page__privacy-content">
					<div class="cart-page__privacy-copy">
						<p class="cart-page__privacy-title">Consentimento LGPD</p>
						<p class="cart-page__privacy-text">
							{{
								hasAcceptedRequiredConsents
									? "O tratamento de dados para pedido e pagamento já foi confirmado."
									: "É necessário aceitar o tratamento de dados para concluir o pedido e seguir para o pagamento."
							}}
						</p>
					</div>

					<v-btn
						class="cart-page__privacy-button"
						color="primary"
						rounded="xl"
						:text="hasAcceptedRequiredConsents ? 'Rever termos' : 'Ler e aceitar termos'"
						variant="text"
						@click="openPrivacyDialog"
					/>
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
				@click="goToPayment"
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
		class="cart-page__snackbar"
		color="info"
		location="bottom"
		rounded="pill"
		timeout="3600"
	>
		{{ snackbarMessage }}
	</v-snackbar>

	<RemoveCartItemDialog
		v-model="isRemoveDialogVisible"
		:item-name="pendingRemoveItemName"
		@cancel="cancelRemoveItem"
		@confirm="confirmRemoveItem"
	/>

	<PrivacyTermsDialog
		v-model="isPrivacyDialogVisible"
		:consent-options="consentOptions"
		:selected-ids="acceptedConsentIds"
		:terms="terms"
		@accept="handlePrivacyAccept"
	/>

	<LoyaltyProgramDialog
		v-model="isLoyaltyDialogVisible"
		:program="program"
	/>
</template>

<script setup lang="ts">
import CartItemCard from "@/features/cart/components/CartItemCard.vue";
import RemoveCartItemDialog from "@/features/cart/components/RemoveCartItemDialog.vue";
import { useCart } from "@/features/cart/composables/useCart";
import LoyaltyEnrollmentCard from "@/features/loyalty/components/LoyaltyEnrollmentCard.vue";
import LoyaltyProgramDialog from "@/features/loyalty/components/LoyaltyProgramDialog.vue";
import PrivacyTermsDialog from "@/features/privacy/components/PrivacyTermsDialog.vue";
import AppHeader from "@/shared/components/AppHeader.vue";
import { formatValueToBRL } from "@/shared/utils/formatCurrency";

const {
	acceptedConsentIds,
	cancelRemoveItem,
	confirmRemoveItem,
	consentOptions,
	currentPoints,
	decrementItemQuantity,
	deliveryFee,
	enrollment,
	finalTotal,
	goBack,
	goToPayment,
	handlePrivacyAccept,
	handleRemoveItem,
	hasAcceptedRequiredConsents,
	hasItems,
	hasTypedLoyaltyPhone,
	incrementItemQuantity,
	isLoyaltyDialogVisible,
	isPrivacyDialogVisible,
	isRemoveDialogVisible,
	isSnackbarVisible,
	items,
	loyaltyDiscountAmount,
	loyaltyDiscountMessage,
	loyaltyMemberFound,
	openLoyaltyDialog,
	openPrivacyDialog,
	pendingRemoveItemName,
	program,
	promotionalDiscountAmount,
	setLoyaltyParticipate,
	setLoyaltyPhone,
	showLoyaltyNotFoundMessage,
	snackbarMessage,
	terms,
	totals,
} = useCart();
</script>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as *;

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
		gap: 22px;
	}

	&__list {
		display: grid;
		gap: 14px;
	}

	&__summary {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 18px;
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
		font-size: 1.08rem;
		line-height: 1.25;
		font-weight: 500;
	}

	&__summary-total {
		padding-top: 4px;
		font-size: 1.85rem;
		line-height: 1.05;
		font-weight: 800;
	}

	&__action {
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}

	&__privacy {
		padding: 16px 18px;
		border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
	}

	&__privacy-content {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__privacy-copy {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__privacy-title {
		color: var(--color-ink-950);
		font-size: 1rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__privacy-text {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.45;
	}

	&__privacy-button {
		align-self: flex-start;
		padding-inline: 0;
		text-transform: none;
		letter-spacing: 0;
		font-weight: 600;
	}

	&__empty {
		margin-top: 8px;
	}

	:deep(.cart-page__snackbar) {
		margin-bottom: 20px;
	}

	@include desktop {
		max-width: 1220px;
		padding: 28px 32px 40px;

		&__header {
			margin-bottom: 28px;
		}

		&__content {
			display: grid;
			grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
			gap: 24px 28px;
			align-items: start;
		}

		&__list {
			grid-column: 1;
			grid-row: 1 / span 4;
			gap: 16px;
		}

		&__summary {
			grid-column: 2;
		}

		&__action {
			grid-column: 2;
		}
	}
}
</style>
