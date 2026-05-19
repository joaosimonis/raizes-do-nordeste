<template>
	<div class="order-status-step-item">
		<v-avatar
			:color="avatarColor"
			class="order-status-step-item__avatar"
			rounded="lg"
			size="64"
		>
			<v-icon
				:color="iconColor"
				:icon="icon"
				size="28"
			/>
		</v-avatar>

		<p class="order-status-step-item__label">{{ step.label }}</p>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OrderStatusStep } from "@/features/orders/types/order.types";

const props = defineProps<{
	step: OrderStatusStep;
}>();

const icon = computed(() => {
	if (props.step.isCurrent || props.step.isCompleted) {
		return "mdi-check";
	}

	return "mdi-circle-outline";
});

const avatarColor = computed(() => {
	if (props.step.isCurrent) {
		return "rgb(var(--v-theme-primary) / 0.14)";
	}

	if (props.step.isCompleted) {
		return "rgb(var(--v-theme-secondary) / 0.14)";
	}

	return "var(--color-sand-100)";
});

const iconColor = computed(() => {
	if (props.step.isCurrent) {
		return "rgb(var(--v-theme-primary))";
	}

	if (props.step.isCompleted) {
		return "rgb(var(--v-theme-secondary))";
	}

	return "var(--color-stone-600)";
});
</script>

<style scoped lang="scss">
.order-status-step-item {
	display: flex;
	gap: 16px;
	align-items: center;

	&__avatar {
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.08);
	}

	&__label {
		color: var(--color-ink-950);
		font-size: 1.1rem;
		line-height: 1.2;
		font-weight: 600;
	}
}
</style>
