<template>
  <v-container class="product-details-page">
    <AppPageHeader
      class="product-details-page__header"
      show-back-button
      title="Raízes do Nordeste"
      @back="goBack"
    />

    <div v-if="selectedMenuItem" class="product-details-page__content">
      <ProductHeroCard :item="selectedMenuItem" />

      <div class="product-details-page__details">
        <h2 class="product-details-page__title">{{ selectedMenuItem.name }}</h2>
        <p class="product-details-page__price">{{ formatValueToBRL(selectedMenuItem.price) }}</p>
        <p class="product-details-page__description">{{ selectedMenuItem.description }}</p>
      </div>

      <div class="product-details-page__notes">
        <p class="product-details-page__section-title">Observações</p>

        <v-textarea
          v-model="notes"
          auto-grow
          class="product-details-page__notes-input"
          hide-details
          placeholder="Ex.: Sem cebola, sem pimenta."
          rows="2"
          rounded="lg"
          variant="outlined"
        />
      </div>

      <div class="product-details-page__quantity">
        <v-btn
          :disabled="!canDecreaseQuantity"
          icon="mdi-minus"
          rounded="lg"
          size="large"
          variant="tonal"
          @click="decreaseQuantity"
        />

        <span class="product-details-page__quantity-value">{{ quantity }}</span>

        <v-btn
          icon="mdi-plus"
          rounded="lg"
          size="large"
          variant="tonal"
          @click="increaseQuantity"
        />
      </div>

      <v-btn
        block
        class="product-details-page__action"
        color="primary"
        rounded="xl"
        size="x-large"
        text="Adicionar ao carrinho"
        variant="flat"
        @click="goToCart"
      />
    </div>

    <v-alert
      v-else
      border="start"
      class="product-details-page__empty"
      color="warning"
      text="Selecione um produto no cardápio para ver os detalhes."
      variant="tonal"
    />
  </v-container>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import ProductHeroCard from '@/features/menu/components/ProductHeroCard.vue'
  import { useProductDetails } from '@/features/menu/composables/useProductDetails'
  import AppPageHeader from '@/shared/components/AppPageHeader.vue'
  import { formatValueToBRL } from '@/shared/utils/formatCurrency'

  const router = useRouter()
  const { canDecreaseQuantity, decreaseQuantity, increaseQuantity, notes, quantity, selectedMenuItem } = useProductDetails()

  const goBack = () => {
    router.back()
  }

  const goToCart = () => {
    router.push({ name: 'cart' })
  }
</script>

<style scoped lang="scss">
  .product-details-page {
    min-height: 100vh;
    max-width: 860px;
    margin: 0 auto;
    padding: 16px;

    &__header {
      margin-bottom: 24px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &__title {
      color: var(--color-ink-950);
      font-size: 1.95rem;
      line-height: 1.08;
      font-weight: 700;
    }

    &__price {
      color: var(--color-ink-950);
      font-size: 2rem;
      line-height: 1;
      font-weight: 800;
    }

    &__description {
      color: var(--color-stone-600);
      font-size: 1rem;
      line-height: 1.65;
    }

    &__notes {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &__section-title {
      color: var(--color-ink-950);
      font-size: 1.5rem;
      line-height: 1.1;
      font-weight: 700;
    }

    &__quantity {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: center;
    }

    &__quantity-value {
      min-width: 2ch;
      color: var(--color-ink-950);
      font-size: 2rem;
      line-height: 1;
      font-weight: 700;
      text-align: center;
    }

    &__action {
      text-transform: none;
      letter-spacing: 0;
      font-weight: 700;
    }

    &__empty {
      margin-top: 8px;
    }
  }
</style>
