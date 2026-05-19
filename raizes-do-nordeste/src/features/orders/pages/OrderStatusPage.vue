<template>
	<v-container class="order-status-page">
		<AppHeader
			class="order-status-page__header"
			:subtitle="currentOrder?.code ?? ''"
			show-back-button
			title="Status do pedido"
			@back="goBackToStart"
		/>

		<div v-if="currentOrder" class="order-status-page__content">
			<v-card
				class="order-status-page__code-card"
				elevation="0"
				rounded="xl"
				variant="outlined"
			>
				<span class="order-status-page__code">{{ currentOrder.code }}</span>
			</v-card>

			<div class="order-status-page__steps">
				<OrderStatusStepItem
					v-for="step in currentOrder.steps"
					:key="step.id"
					:step="step"
				/>
			</div>

			<p class="order-status-page__message">{{ currentOrder.statusMessage }}</p>

			<v-sheet class="order-status-page__estimate" color="var(--color-sand-100)" rounded="xl">
				Tempo estimado: {{ currentOrder.estimatedPickupTime }}
			</v-sheet>

			<v-btn
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

	const { currentOrder, goBackToStart } = useOrderStatus();
</script>

<style scoped lang="scss">
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
			gap: 24px;
		}

		&__code-card {
			padding: 20px;
			border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);
		}

		&__code {
			color: var(--color-ink-950);
			font-size: 1.35rem;
			line-height: 1.2;
			font-weight: 600;
		}

		&__steps {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&__message {
			color: var(--color-ink-950);
			font-size: 2rem;
			line-height: 1.18;
			font-weight: 600;
			text-align: center;
		}

		&__estimate {
			padding: 18px 20px;
			color: var(--color-ink-950);
			font-size: 1.2rem;
			line-height: 1.25;
			font-weight: 600;
			text-align: center;
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
