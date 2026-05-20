<template>
	<v-card
		class="loyalty-enrollment-card"
		elevation="0"
		rounded="xl"
		variant="outlined"
	>
		<div class="loyalty-enrollment-card__header">
			<div class="loyalty-enrollment-card__copy">
				<p class="loyalty-enrollment-card__title">Programa de fidelidade</p>
				<p class="loyalty-enrollment-card__text">Informe o telefone cadastrado para consultar seu saldo e aplicar desconto neste pedido.</p>
			</div>

			<v-btn
				class="loyalty-enrollment-card__button"
				color="primary"
				rounded="xl"
				text="Saiba como funciona"
				variant="text"
				@click="$emit('openInfo')"
			/>
		</div>

		<div class="loyalty-enrollment-card__form">
			<v-text-field
				class="loyalty-enrollment-card__phone"
				hide-details="auto"
				label="Telefone cadastrado"
				:model-value="phone"
				placeholder="(81) 99999-9999"
				prepend-inner-icon="mdi-phone-outline"
				type="tel"
				variant="outlined"
				@update:model-value="$emit('update:phone', String($event ?? ''))"
			/>

			<v-switch
				class="loyalty-enrollment-card__switch"
				color="primary"
				hide-details
				inset
				:model-value="participate"
				@update:model-value="$emit('update:participate', Boolean($event))"
			>
				<template #label>
					<span class="loyalty-enrollment-card__switch-label">Quero aplicar meu desconto neste pedido</span>
				</template>
			</v-switch>
		</div>

		<p
			v-if="participate && !hasTypedPhone"
			class="loyalty-enrollment-card__helper"
		>
			Informe o telefone cadastrado para consultar o saldo de pontos e validar o desconto.
		</p>

		<p
			v-else-if="showNotFoundMessage"
			class="loyalty-enrollment-card__feedback loyalty-enrollment-card__feedback--warning"
		>
			Nenhum cadastro encontrado. Insira um outro telefone.
		</p>

		<div
			v-else-if="memberFound"
			class="loyalty-enrollment-card__summary"
		>
			<div class="loyalty-enrollment-card__summary-line">
				<span>Saldo atual</span>
				<strong>{{ currentPoints }} pontos</strong>
			</div>

			<p class="loyalty-enrollment-card__feedback">
				{{ discountMessage }}
			</p>
		</div>
	</v-card>
</template>

<script setup lang="ts">
defineProps<{
	currentPoints: number;
	discountMessage: string;
	hasTypedPhone: boolean;
	memberFound: boolean;
	participate: boolean;
	phone: string;
	showNotFoundMessage: boolean;
}>();

defineEmits<{
	openInfo: [];
	"update:participate": [value: boolean];
	"update:phone": [value: string];
}>();
</script>

<style scoped lang="scss">
.loyalty-enrollment-card {
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 16px 18px;
	border-color: rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);

	&__header {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__copy {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 1rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__text {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.45;
	}

	&__button {
		align-self: flex-start;
		padding-inline: 0;
		text-transform: none;
		letter-spacing: 0;
		font-weight: 600;
	}

	&__form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	&__phone {
		:deep(.v-field) {
			border-radius: 16px;
		}
	}

	&__switch {
		margin-top: -4px;
	}

	&__switch-label {
		color: var(--color-ink-950);
		font-size: 0.95rem;
		line-height: 1.4;
		font-weight: 600;
	}

	&__helper,
	&__feedback {
		font-size: 0.92rem;
		line-height: 1.5;
	}

	&__helper {
		color: var(--color-stone-600);
	}

	&__feedback {
		color: var(--color-ink-950);
	}

	&__feedback--warning {
		color: rgb(var(--v-theme-warning));
		font-weight: 600;
	}

	&__summary {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px 16px;
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.08);
		border-radius: 16px;
		background: rgb(var(--v-theme-primary) / 0.03);
	}

	&__summary-line {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		color: var(--color-ink-950);
		font-size: 0.95rem;
		line-height: 1.3;

		strong {
			font-weight: 800;
		}
	}
}
</style>
