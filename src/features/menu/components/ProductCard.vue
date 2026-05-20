<template>
	<v-card
		class="product-card"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<div class="product-card__content">
			<div class="product-card__image">
				<v-img
					:alt="item.image.alt"
					cover
					:src="item.image.src"
					class="product-card__media"
				/>
			</div>

			<p class="product-card__description">{{ item.description }}</p>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/features/menu/types/menu.types";

defineProps<{
	item: MenuItem;
}>();
</script>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as *;

.product-card {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	min-height: 260px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
		width: 100%;
		max-width: 280px;
		text-align: center;
	}

	&__image {
		width: 138px;
		height: 138px;
		overflow: hidden;
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
		border-radius: 12px;
		background: var(--color-sand-100);
	}

	&__media {
		width: 100%;
		height: 100%;
	}

	&__description {
		color: var(--color-stone-600);
		font-size: 0.98rem;
		line-height: 1.55;
	}

	@include desktop {
		min-height: 100%;
		padding: 24px;

		&__content {
			max-width: 360px;
			gap: 22px;
		}

		&__image {
			width: 180px;
			height: 180px;
		}
	}
}
</style>
