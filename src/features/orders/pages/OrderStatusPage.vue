<template>
	<v-container class="order-status-page">
		<AppHeader
			class="order-status-page__header"
			show-back-button
			title="Status do pedido"
			@back="goBackToStart"
		/>

		<div
			v-if="currentOrder"
			class="order-status-page__content"
		>
			<v-card
				class="order-status-page__code-card"
				elevation="0"
				rounded="xl"
				variant="outlined"
			>
				<p class="order-status-page__code-label">Pedido</p>
				<span class="order-status-page__code">{{ currentOrder.code }}</span>
			</v-card>

			<p class="order-status-page__message">{{ currentOrder.statusMessage }}</p>

			<v-card
				v-if="!isOrderCompleted"
				class="order-status-page__estimate"
				elevation="0"
				rounded="xl"
				variant="outlined"
			>
				<v-icon
					class="order-status-page__estimate-icon"
					color="primary"
					icon="mdi-clock-outline"
					size="20"
				/>
				<div class="order-status-page__estimate-content">
					<p class="order-status-page__estimate-label">Tempo estimado</p>
					<p class="order-status-page__estimate-value">{{ currentOrder.estimatedPickupTime }}</p>
				</div>
			</v-card>

			<div class="order-status-page__steps">
				<OrderStatusStepItem
					v-for="step in currentOrder.steps"
					:key="step.id"
					:action-label="advanceActionLabel"
					:show-advance-action="step.isCurrent && canAdvanceCurrentOrder"
					:step="step"
					@advance="advanceOrderStep"
				/>
			</div>

			<v-alert
				v-if="isOrderCompleted"
				border="start"
				class="order-status-page__completion"
				color="success"
				text="O pedido foi entregue e o acompanhamento foi concluído."
				variant="tonal"
			/>

			<v-btn
				v-if="isOrderCompleted"
				block
				class="order-status-page__action"
				color="primary"
				rounded="xl"
				size="x-large"
				text="Voltar ao início"
				variant="flat"
				@click="goBackToStart"
			/>
		</div>

		<v-alert
			v-else
			border="start"
			class="order-status-page__empty"
			color="warning"
			text="Nenhum pedido encontrado para acompanhamento."
			variant="tonal"
		/>
	</v-container>
</template>

<script setup lang="ts">
import OrderStatusStepItem from "@/features/orders/components/OrderStatusStepItem.vue";
import { useOrderStatus } from "@/features/orders/composables/useOrderStatus";
import AppHeader from "@/shared/components/AppHeader.vue";

const { advanceActionLabel, advanceOrderStep, canAdvanceCurrentOrder, currentOrder, goBackToStart, isOrderCompleted } = useOrderStatus();
</script>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as *;

.order-status-page {
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
		gap: 18px;
	}

	&__code-card {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 18px 20px;
		border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);
	}

	&__code-label {
		color: var(--color-stone-600);
		font-size: 0.9rem;
		line-height: 1.2;
		font-weight: 500;
	}

	&__code {
		color: var(--color-ink-950);
		font-size: 1.28rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__steps {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__message {
		color: var(--color-ink-950);
		max-width: 22ch;
		margin: 0 auto;
		font-size: 1.32rem;
		line-height: 1.28;
		font-weight: 600;
		text-align: center;
	}

	&__estimate {
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 16px 18px;
		border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
	}

	&__estimate-icon {
		flex-shrink: 0;
	}

	&__estimate-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 4px;
	}

	&__estimate-label {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.2;
		font-weight: 500;
		text-align: left;
	}

	&__estimate-value {
		color: var(--color-ink-950);
		font-size: 1.08rem;
		line-height: 1.2;
		font-weight: 700;
		text-align: left;
	}

	&__action {
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}

	&__completion {
		margin-top: 4px;
	}

	&__empty {
		margin-top: 8px;
	}

	@include desktop {
		max-width: 980px;
		padding: 28px 32px 40px;

		&__header {
			margin-bottom: 28px;
		}

		&__content {
			gap: 22px;
		}

		&__message {
			max-width: 32ch;
			font-size: 1.5rem;
		}

		&__steps {
			max-width: 760px;
			margin: 0 auto;
			width: 100%;
		}
	}
}
</style>
