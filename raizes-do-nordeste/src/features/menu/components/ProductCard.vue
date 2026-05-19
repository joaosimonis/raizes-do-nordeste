<template>
	<v-card
		class="product-card"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<h2 class="product-card__title">{{ item.name }}</h2>

		<v-avatar
			class="product-card__image"
			color="var(--color-sand-100)"
			rounded="lg"
			size="96"
		>
			<v-icon
				color="var(--color-earth-700)"
				icon="mdi-food-outline"
				size="56"
			/>
		</v-avatar>
	</v-card>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/features/menu/types/menu.types";

defineProps<{
	item: MenuItem;
}>();
</script>

<style scoped lang="scss">
.product-card {
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	padding: 24px 20px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);
	text-align: center;

	&__title {
		color: var(--color-ink-950);
		font-size: 1.9rem;
		line-height: 1.1;
		font-weight: 700;
	}

	&__image {
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
	}
}
</style>
