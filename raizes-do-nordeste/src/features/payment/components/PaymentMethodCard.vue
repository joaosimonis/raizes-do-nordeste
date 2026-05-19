<template>
	<v-card
		:class="['payment-method-card', { 'payment-method-card--selected': isSelected }]"
		elevation="0"
		rounded="xl"
		variant="outlined"
		@click="$emit('select', method.id)"
	>
		<v-avatar
			class="payment-method-card__media"
			color="var(--color-sand-100)"
			rounded="lg"
			size="72"
		>
			<v-icon
				:icon="icon"
				color="var(--color-earth-700)"
				size="32"
			/>
		</v-avatar>

		<div class="payment-method-card__content">
			<div class="payment-method-card__heading">
				<p class="payment-method-card__label">{{ method.label }}</p>

				<v-icon
					v-if="isSelected"
					class="payment-method-card__check"
					color="primary"
					icon="mdi-check-circle"
					size="20"
				/>
			</div>
			<p class="payment-method-card__description">{{ method.description }}</p>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PaymentMethod } from "@/features/payment/types/payment.types";

const props = defineProps<{
	isSelected: boolean;
	method: PaymentMethod;
}>();

defineEmits<{
	select: [methodId: PaymentMethod["id"]];
}>();

const icon = computed(() => {
	if (props.method.id === "cartao_credito") {
		return "mdi-credit-card-outline";
	}

	if (props.method.id === "pix") {
		return "mdi-qrcode-scan";
	}

	return "mdi-cash";
});
</script>

<style scoped lang="scss">
.payment-method-card {
	display: flex;
	gap: 16px;
	align-items: center;
	padding: 16px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);
	cursor: pointer;
	transition:
		border-color 0.2s ease,
		background-color 0.2s ease,
		box-shadow 0.2s ease;

	&--selected {
		border-color: rgb(var(--v-theme-primary) / 0.55);
		background-color: rgb(var(--v-theme-primary) / 0.05);
		box-shadow: 0 10px 24px rgb(var(--v-theme-primary) / 0.06);
	}

	&__media {
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.1);
	}

	&__content {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	&__heading {
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: space-between;
	}

	&__label {
		color: var(--color-ink-950);
		font-size: 1.15rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__description {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.4;
	}
}
</style>
