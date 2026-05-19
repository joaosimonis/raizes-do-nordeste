<template>
	<v-dialog
		:model-value="modelValue"
		max-width="360"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<v-card
			class="remove-cart-item-dialog"
			rounded="xl"
		>
			<div class="remove-cart-item-dialog__content">
				<h2 class="remove-cart-item-dialog__title">Remover item</h2>
				<p class="remove-cart-item-dialog__text">
					Deseja remover <strong>{{ itemName }}</strong> do carrinho?
				</p>
			</div>

			<div class="remove-cart-item-dialog__actions">
				<v-btn
					class="remove-cart-item-dialog__button"
					rounded="xl"
					text="Cancelar"
					variant="text"
					@click="$emit('cancel')"
				/>
				<v-btn
					class="remove-cart-item-dialog__button"
					color="error"
					rounded="xl"
					text="Remover"
					variant="flat"
					@click="$emit('confirm')"
				/>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
defineProps<{
	itemName: string;
	modelValue: boolean;
}>();

defineEmits<{
	cancel: [];
	confirm: [];
	"update:modelValue": [value: boolean];
}>();
</script>

<style scoped lang="scss">
.remove-cart-item-dialog {
	padding: 20px;

	&__content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 1.25rem;
		line-height: 1.15;
		font-weight: 700;
	}

	&__text {
		color: var(--color-stone-600);
		font-size: 0.98rem;
		line-height: 1.5;
	}

	&__actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 20px;
	}

	&__button {
		text-transform: none;
		letter-spacing: 0;
		font-weight: 600;
	}
}
</style>
