<template>
	<v-card
		class="card-payment-step"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<div class="card-payment-step__visual">
			<v-icon
				:icon="icon"
				color="primary"
				size="40"
			/>
		</div>

		<div class="card-payment-step__copy">
			<p class="card-payment-step__eyebrow">Pagamento com cartão</p>
			<h2 class="card-payment-step__title">{{ title }}</h2>
			<p class="card-payment-step__description">{{ description }}</p>
		</div>

		<v-btn
			block
			class="card-payment-step__action"
			color="primary"
			rounded="xl"
			size="x-large"
			:text="actionText"
			variant="flat"
			@click="$emit('next')"
		/>
	</v-card>
</template>

<script setup lang="ts">
defineProps<{
	actionText: string;
	description: string;
	icon: string;
	title: string;
}>();

defineEmits<{
	next: [];
}>();
</script>

<style scoped lang="scss">
.card-payment-step {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 22px 20px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__visual {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		border-radius: 20px;
		background: rgb(var(--v-theme-primary) / 0.08);
	}

	&__copy {
		display: flex;
		flex-direction: column;
		gap: 6px;
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
