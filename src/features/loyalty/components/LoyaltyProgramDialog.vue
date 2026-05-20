<template>
	<v-dialog
		:model-value="modelValue"
		max-width="560"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<v-card
			class="loyalty-program-dialog"
			rounded="xl"
		>
			<div class="loyalty-program-dialog__header">
				<p class="loyalty-program-dialog__eyebrow">Programa de fidelidade</p>
				<h2 class="loyalty-program-dialog__title">{{ program.name }}</h2>
				<p class="loyalty-program-dialog__description">{{ program.description }}</p>
			</div>

			<div class="loyalty-program-dialog__sections">
				<div
					v-for="section in program.sections"
					:key="section.id"
					class="loyalty-program-dialog__section"
				>
					<p class="loyalty-program-dialog__section-title">{{ section.title }}</p>
					<p class="loyalty-program-dialog__section-content">{{ section.content }}</p>
				</div>
			</div>

			<div class="loyalty-program-dialog__discounts">
				<p class="loyalty-program-dialog__discounts-title">Faixas de desconto</p>

				<div
					v-for="tier in program.discountTiers"
					:key="tier.id"
					class="loyalty-program-dialog__discount-card"
				>
					<div class="loyalty-program-dialog__discount-copy">
						<p class="loyalty-program-dialog__discount-title">{{ tier.title }}</p>
						<p class="loyalty-program-dialog__discount-description">{{ tier.description }}</p>
					</div>

					<p class="loyalty-program-dialog__discount-points">{{ tier.pointsRequired }} pts</p>
				</div>
			</div>

			<div class="loyalty-program-dialog__actions">
				<v-btn
					color="primary"
					rounded="xl"
					text="Entendi"
					variant="flat"
					@click="$emit('update:modelValue', false)"
				/>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import type { LoyaltyProgram } from "@/features/loyalty/types/loyalty.types";

defineProps<{
	modelValue: boolean;
	program: LoyaltyProgram;
}>();

defineEmits<{
	"update:modelValue": [value: boolean];
}>();
</script>

<style scoped lang="scss">
.loyalty-program-dialog {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;

	&__header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	&__eyebrow {
		color: var(--color-stone-600);
		font-size: 0.86rem;
		line-height: 1.2;
		font-weight: 600;
		text-transform: uppercase;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 1.35rem;
		line-height: 1.15;
		font-weight: 700;
	}

	&__description {
		color: var(--color-stone-600);
		font-size: 0.94rem;
		line-height: 1.5;
	}

	&__sections {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	&__section {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__section-title {
		color: var(--color-ink-950);
		font-size: 0.98rem;
		line-height: 1.25;
		font-weight: 700;
	}

	&__section-content {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.45;
	}

	&__discounts {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 4px;
	}

	&__discounts-title {
		color: var(--color-ink-950);
		font-size: 1rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__discount-card {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		justify-content: space-between;
		padding: 12px 14px;
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.08);
		border-radius: 16px;
		background: var(--color-white);
	}

	&__discount-copy {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 4px;
	}

	&__discount-title {
		color: var(--color-ink-950);
		font-size: 0.96rem;
		line-height: 1.25;
		font-weight: 700;
	}

	&__discount-description {
		color: var(--color-stone-600);
		font-size: 0.88rem;
		line-height: 1.4;
	}

	&__discount-points {
		color: rgb(var(--v-theme-primary));
		font-size: 0.9rem;
		line-height: 1.2;
		font-weight: 700;
		white-space: nowrap;
	}

	&__actions {
		display: flex;
		justify-content: flex-end;
		padding-top: 4px;
	}
}
</style>
