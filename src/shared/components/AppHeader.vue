<template>
	<header class="app-page-header">
		<div
			v-if="showBackButton || showCartButton"
			class="app-page-header__topbar"
		>
			<v-btn
				v-if="showBackButton"
				class="app-page-header__back"
				icon="mdi-arrow-left"
				rounded="xl"
				size="large"
				variant="text"
				@click="$emit('back')"
			/>

			<v-btn
				v-if="showCartButton"
				class="app-page-header__cart"
				icon="mdi-cart-outline"
				rounded="xl"
				size="large"
				variant="text"
				@click="$emit('cart')"
			/>
		</div>

		<div class="app-page-header__heading">
			<h1 class="app-page-header__title">{{ title }}</h1>
			<p
				v-if="subtitle"
				class="app-page-header__subtitle"
			>
				{{ subtitle }}
			</p>
		</div>
	</header>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		showBackButton?: boolean;
		showCartButton?: boolean;
		subtitle?: string;
		title: string;
	}>(),
	{
		showBackButton: false,
		showCartButton: false,
		subtitle: "",
	}
);

defineEmits<{
	back: [];
	cart: [];
}>();
</script>

<style scoped lang="scss">
.app-page-header {
	display: flex;
	flex-direction: column;
	gap: 10px;

	&__topbar {
		display: flex;
		align-items: center;
		min-height: 40px;
	}

	&__back {
		margin-left: -12px;
		color: var(--color-ink-950);
	}

	&__heading {
		min-width: 0;
	}

	&__title {
		margin: 0;
		color: var(--color-ink-950);
		font-size: 1.85rem;
		line-height: 1.02;
		font-weight: 700;
		text-wrap: balance;
	}

	&__subtitle {
		margin: 8px 0 0;
		color: var(--color-stone-600);
		font-size: 0.98rem;
		line-height: 1.35;
	}

	&__cart {
		margin-left: auto;
		margin-right: -12px;
		color: var(--color-ink-950);
	}
}
</style>
