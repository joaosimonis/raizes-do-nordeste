<template>
	<v-card
		class="cart-item-card"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<div class="cart-item-card__media">
			<v-img
				:alt="item.image.alt"
				cover
				:src="item.image.src"
				class="cart-item-card__image"
			/>
		</div>

		<div class="cart-item-card__body">
			<div class="cart-item-card__top">
				<div class="cart-item-card__details">
					<p class="cart-item-card__name">{{ item.name }}</p>
					<p
						v-if="item.notes"
						class="cart-item-card__notes"
					>
						{{ item.notes }}
					</p>
					<p class="cart-item-card__price">{{ formatValueToBRL(item.unitPrice) }}</p>
				</div>

				<v-btn
					class="cart-item-card__remove"
					icon="mdi-delete-outline"
					size="small"
					variant="text"
					@click="$emit('remove', item.id)"
				/>
			</div>

			<div class="cart-item-card__footer">
				<QuantitySelector
					:disable-decrement="false"
					:value="item.quantity"
					@decrement="$emit('decrement', item.id)"
					@increment="$emit('increment', item.id)"
				/>
			</div>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import type { CartItem } from "@/features/cart/types/cart.types";
import QuantitySelector from "@/shared/components/QuantitySelector.vue";
import { formatValueToBRL } from "@/shared/utils/formatCurrency";

defineProps<{
	item: CartItem;
}>();

defineEmits<{
	decrement: [cartItemId: string];
	increment: [cartItemId: string];
	remove: [cartItemId: string];
}>();
</script>

<style scoped lang="scss">
.cart-item-card {
	display: flex;
	gap: 14px;
	align-items: center;
	padding: 14px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__media {
		width: 84px;
		height: 84px;
		overflow: hidden;
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
		border-radius: 12px;
		background: var(--color-sand-100);
	}

	&__image {
		width: 100%;
		height: 100%;
	}

	&__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 10px;
		min-width: 0;
	}

	&__top {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		justify-content: space-between;
	}

	&__details {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}

	&__name {
		color: var(--color-ink-950);
		font-size: 0.98rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__notes {
		color: var(--color-stone-600);
		font-size: 0.82rem;
		line-height: 1.35;
	}

	&__price {
		color: var(--color-ink-950);
		font-size: 1.6rem;
		line-height: 1;
		font-weight: 800;
	}

	&__remove {
		margin-top: -6px;
		margin-right: -6px;
		color: var(--color-stone-600);
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
	}

	:deep(.quantity-selector) {
		gap: 10px;
	}

	:deep(.quantity-selector__value) {
		min-width: 1.5ch;
		font-size: 1.45rem;
	}

	:deep(.quantity-selector .v-btn) {
		width: 44px;
		height: 44px;
	}
}
</style>
