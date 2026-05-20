<template>
	<v-card
		class="pix-payment-step"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<div class="pix-payment-step__header">
			<div class="pix-payment-step__visual">
				<v-icon
					color="primary"
					icon="mdi-qrcode-scan"
					size="40"
				/>
			</div>

			<div class="pix-payment-step__copy">
				<p class="pix-payment-step__eyebrow">Pagamento via Pix</p>
				<h2 class="pix-payment-step__title">Copie o código Pix</h2>
				<p class="pix-payment-step__description">Use o código abaixo no seu banco ou app de pagamento. Depois, siga para a confirmação do pedido.</p>
			</div>
		</div>

		<div class="pix-payment-step__code">
			<p class="pix-payment-step__code-label">Código Pix</p>
			<p class="pix-payment-step__code-value">{{ pixCode }}</p>
		</div>

		<div class="pix-payment-step__actions">
			<v-btn
				block
				rounded="xl"
				text="Copiar código Pix"
				variant="outlined"
				@click="$emit('copy')"
			/>
			<v-btn
				block
				color="primary"
				rounded="xl"
				text="Continuar"
				variant="flat"
				@click="$emit('next')"
			/>
		</div>
	</v-card>
</template>

<script setup lang="ts">
defineProps<{
	pixCode: string;
}>();

defineEmits<{
	copy: [];
	next: [];
}>();
</script>

<style scoped lang="scss">
.pix-payment-step {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 22px 20px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.14);

	&__header {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

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

	&__code {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 14px 16px;
		border-radius: 18px;
		background: var(--color-white);
		border: 1px dashed rgb(var(--color-ink-900-rgb, 25 25 25) / 0.18);
	}

	&__code-label {
		color: var(--color-stone-600);
		font-size: 0.88rem;
		line-height: 1.25;
		font-weight: 600;
	}

	&__code-value {
		color: var(--color-ink-950);
		font-size: 0.9rem;
		line-height: 1.55;
		word-break: break-all;
	}

	&__actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
}
</style>
