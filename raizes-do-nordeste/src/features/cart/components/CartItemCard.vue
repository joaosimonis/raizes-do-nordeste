<template>
	<v-card
		class="cart-item-card"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<v-avatar
			class="cart-item-card__media"
			color="var(--color-sand-100)"
			rounded="lg"
			size="88"
		>
			<v-icon
				color="var(--color-earth-700)"
				icon="mdi-food-outline"
				size="36"
			/>
		</v-avatar>

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
	gap: 16px;
	align-items: center;
	padding: 16px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__media {
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
	}

	&__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 12px;
		min-width: 0;
	}

	&__top {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		justify-content: space-between;
	}

	&__details {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	&__name {
		color: var(--color-ink-950);
		font-size: 1rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__notes {
		color: var(--color-stone-600);
		font-size: 0.875rem;
		line-height: 1.35;
	}

	&__price {
		color: var(--color-ink-950);
		font-size: 1.75rem;
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
		gap: 14px;
	}

	:deep(.quantity-selector__value) {
		font-size: 1.75rem;
	}
}
</style>
