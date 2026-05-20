<template>
	<v-card
		class="promotion-banner"
		elevation="0"
		rounded="xl"
		variant="tonal"
	>
		<div class="promotion-banner__header">
			<p class="promotion-banner__badge">{{ promotion.highlightLabel }}</p>
			<v-icon
				color="primary"
				icon="mdi-tag-outline"
				size="20"
			/>
		</div>

		<div class="promotion-banner__copy">
			<h2 class="promotion-banner__title">{{ promotion.title }}</h2>
			<p class="promotion-banner__description">{{ promotion.description }}</p>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import type { Promotion } from "@/features/promotions/types/promotion.types";

defineProps<{
	promotion: Promotion;
}>();
</script>

<style scoped lang="scss">
.promotion-banner {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px 18px;
	background: rgb(var(--v-theme-primary) / 0.08);
	border: 1px solid rgb(var(--v-theme-primary) / 0.16);

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	&__badge {
		color: rgb(var(--v-theme-primary));
		font-size: 0.8rem;
		line-height: 1.2;
		font-weight: 700;
		text-transform: uppercase;
	}

	&__copy {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 1.1rem;
		line-height: 1.2;
		font-weight: 800;
	}

	&__description {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.45;
	}
}
</style>
