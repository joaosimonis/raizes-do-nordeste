<template>
	<v-card
		class="payment-success-step"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<div class="payment-success-step__visual">
			<v-icon
				color="success"
				icon="mdi-check-circle-outline"
				size="44"
			/>
		</div>

		<div class="payment-success-step__copy">
			<p class="payment-success-step__eyebrow">Pagamento confirmado</p>
			<h2 class="payment-success-step__title">Tudo certo por aqui!</h2>
			<p class="payment-success-step__description">O pagamento foi confirmado pelo serviço externo. Agora você já pode acompanhar o preparo do pedido.</p>
		</div>

		<v-btn
			block
			class="payment-success-step__action"
			color="primary"
			rounded="xl"
			size="x-large"
			text="Acompanhar pedido"
			variant="flat"
			@click="$emit('finish')"
		/>
	</v-card>
</template>

<script setup lang="ts">
defineEmits<{
	finish: [];
}>();
</script>

<style scoped lang="scss">
.payment-success-step {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 22px 20px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__visual {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 76px;
		height: 76px;
		border-radius: 22px;
		background: rgb(var(--v-theme-success) / 0.08);
	}

	&__copy {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	&__eyebrow {
		color: rgb(var(--v-theme-success));
		font-size: 0.86rem;
		line-height: 1.2;
		font-weight: 700;
		text-transform: uppercase;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 1.4rem;
		line-height: 1.15;
		font-weight: 800;
	}

	&__description {
		color: var(--color-stone-600);
		font-size: 0.96rem;
		line-height: 1.5;
	}

	&__action {
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
	}
}
</style>
