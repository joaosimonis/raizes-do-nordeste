<template>
	<v-card
		class="unit-card"
		rounded="xl"
		variant="outlined"
	>
		<div class="unit-card__media">
			<v-img
				v-if="unit.image?.src"
				:alt="unit.image.alt"
				cover
				:src="unit.image.src"
				class="unit-card__image"
			/>

			<v-icon
				v-else
				icon="mdi-storefront-outline"
				size="34"
			/>
		</div>

		<div class="unit-card__content">
			<div class="unit-card__header">
				<h2 class="unit-card__title">{{ unit.name }}</h2>

				<v-chip
					class="unit-card__status"
					size="small"
					variant="tonal"
				>
					{{ unit.neighborhood }}
				</v-chip>
			</div>

			<p class="unit-card__address">{{ unit.address }}</p>
			<p class="unit-card__location">{{ unit.city }} - {{ unit.state }}</p>

			<div class="unit-card__footer">
				<span class="unit-card__meta"> {{ unit.pickupEstimateMinutes }} min </span>

				<v-btn
					class="unit-card__action"
					color="primary"
					rounded="pill"
					text="Selecionar"
					variant="flat"
					@click="$emit('select', unit)"
				/>
			</div>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import type { Unit } from "@/features/units/types/unit.types";

defineProps<{
	unit: Unit;
}>();

defineEmits<{
	select: [unit: Unit];
}>();
</script>

<style scoped lang="scss">
.unit-card {
	display: flex;
	gap: 16px;
	align-items: center;
	padding: 16px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__media {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 88px;
		height: 88px;
		overflow: hidden;
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.16);
		border-radius: 12px;
		background: var(--color-sand-100);
		color: var(--color-earth-700);
	}

	&__image {
		width: 100%;
		height: 100%;
	}

	&__content {
		min-width: 0;
	}

	&__header {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	&__title,
	&__address,
	&__location {
		margin: 0;
		color: var(--color-ink-950);
	}

	&__title {
		font-size: 1rem;
		line-height: 1.25;
		font-weight: 700;
	}

	&__status {
		flex-shrink: 0;
	}

	&__address,
	&__location {
		font-size: 0.95rem;
		line-height: 1.4;
	}

	&__location {
		margin-top: 4px;
		color: var(--color-stone-500);
	}

	&__footer {
		display: flex;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
		margin-top: 14px;
	}

	&__meta {
		color: var(--color-stone-500);
		font-size: 0.9rem;
		font-weight: 600;
	}

	&__action {
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}
}
</style>
