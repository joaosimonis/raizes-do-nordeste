<template>
	<div class="app-page-header">
		<div class="app-page-header__main">
			<v-btn
				v-if="showBackButton"
				class="app-page-header__back"
				icon="mdi-arrow-left"
				size="large"
				variant="text"
				@click="$emit('back')"
			/>

			<div class="app-page-header__content">
				<h1 class="app-page-header__title">{{ title }}</h1>
				<p
					v-if="subtitle"
					class="app-page-header__subtitle"
				>
					{{ subtitle }}
				</p>
			</div>
		</div>

		<v-btn
			v-if="showCartButton"
			class="app-page-header__cart"
			icon="mdi-cart-outline"
			size="large"
			variant="text"
			@click="$emit('cart')"
		/>
	</div>
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
	gap: 16px;
	align-items: flex-start;
	justify-content: space-between;

	&__main {
		display: flex;
		gap: 12px;
		flex: 1;
		min-width: 0;
		align-items: flex-start;
	}

	&__back {
		margin-left: -12px;
	}

	&__content {
		min-width: 0;
		padding-top: 4px;
	}

	&__title {
		margin: 0;
		color: var(--color-ink-950);
		font-size: 2rem;
		line-height: 1.05;
		font-weight: 700;
	}

	&__subtitle {
		margin: 14px 0 0;
		color: var(--color-stone-600);
		font-size: 1rem;
		line-height: 1.35;
	}

	&__cart {
		margin-right: -12px;
		color: var(--color-ink-950);
	}
}
</style>
