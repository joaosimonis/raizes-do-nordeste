<template>
	<v-card
		class="menu-item-card"
		rounded="xl"
		variant="outlined"
		@click="$emit('open', item)"
	>
		<div class="menu-item-card__media">
			<v-img
				:alt="item.image.alt"
				cover
				:src="item.image.src"
				class="menu-item-card__image"
			/>
		</div>

		<div class="menu-item-card__body">
			<h2 class="menu-item-card__title">{{ item.name }}</h2>
			<p class="menu-item-card__price">{{ formatValueToBRL(item.price) }}</p>
		</div>

		<v-btn
			class="menu-item-card__action"
			color="primary"
			rounded="lg"
			text="Adicionar"
			variant="flat"
			@click.stop="$emit('add', item)"
		/>
	</v-card>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/features/menu/types/menu.types";
import { formatValueToBRL } from "@/shared/utils/formatCurrency";

defineProps<{
	item: MenuItem;
}>();

defineEmits<{
	add: [item: MenuItem];
	open: [item: MenuItem];
}>();
</script>

<style scoped lang="scss">
.menu-item-card {
	display: flex;
	gap: 16px;
	align-items: center;
	padding: 16px;
	border-color: var(--color-ink-900);
	cursor: pointer;

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
	}

	&__image {
		width: 100%;
		height: 100%;
	}

	&__body {
		flex: 1;
		min-width: 0;
	}

	&__title,
	&__price {
		margin: 0;
		color: var(--color-ink-950);
	}

	&__title {
		font-size: 1rem;
		line-height: 1.3;
		font-weight: 600;
	}

	&__price {
		margin-top: 10px;
		font-size: 1.5rem;
		line-height: 1;
		font-weight: 700;
	}

	&__action {
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}
}
</style>
