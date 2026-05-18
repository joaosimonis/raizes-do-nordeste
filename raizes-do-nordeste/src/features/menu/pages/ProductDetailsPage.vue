<template>
  <v-container class="product-details-page">
    <AppPageHeader
      class="product-details-page__header"
      show-back-button
      title="Raízes do Nordeste"
      @back="goBack"
    />

    <div v-if="selectedMenuItem" class="product-details-page__content">
      <ProductCard :item="selectedMenuItem" />

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

      <QuantitySelector
        :disable-decrement="!canDecreaseQuantity"
        :value="quantity"
        @decrement="decreaseQuantity"
        @increment="increaseQuantity"
      />

      <v-btn
        block
        class="product-details-page__action"
        color="primary"
        rounded="xl"
        size="x-large"
        text="Adicionar ao carrinho"
        variant="flat"
        @click="handleAddToCart"
      />

      <div class="product-details-page__actions">
        <v-btn
          block
          class="product-details-page__secondary-action"
          color="secondary"
          prepend-icon="mdi-cart-outline"
          rounded="xl"
          size="large"
          text="Ver carrinho"
          variant="tonal"
          @click="goToCart"
        />

        <v-btn
          block
          class="product-details-page__secondary-action"
          append-icon="mdi-arrow-right"
          rounded="xl"
          size="large"
          text="Escolher outro produto"
          variant="text"
          @click="goToMenu"
        />
      </div>
    </div>

    <v-alert
      v-else
      border="start"
      class="product-details-page__empty"
      color="warning"
      text="Selecione um produto no cardápio para ver os detalhes."
      variant="tonal"
    />

    <v-snackbar
      v-model="isSnackbarVisible"
      color="success"
      location="bottom"
      rounded="pill"
      timeout="2500"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import ProductCard from '@/features/menu/components/ProductCard.vue'
  import { useProductDetails } from '@/features/menu/composables/useProductDetails'
  import { useUnitsStore } from '@/features/units/store/units.store'
  import AppPageHeader from '@/shared/components/AppPageHeader.vue'
  import QuantitySelector from '@/shared/components/QuantitySelector.vue'
  import { formatValueToBRL } from '@/shared/utils/formatCurrency'

  const router = useRouter()
  const unitsStore = useUnitsStore()
  const { selectedUnitId } = storeToRefs(unitsStore)
  const { addSelectedItemToCart, canDecreaseQuantity, decreaseQuantity, increaseQuantity, notes, quantity, selectedMenuItem } = useProductDetails()
  const isSnackbarVisible = ref(false)
  const snackbarMessage = ref('')

  const goBack = () => {
    router.back()
  }

  const goToCart = () => {
    router.push({ name: 'cart' })
  }

  const goToMenu = () => {
    router.push({
      name: 'menu',
      query: selectedUnitId.value ? { unit: selectedUnitId.value } : undefined,
    })
  }

  const handleAddToCart = () => {
    const selectedItemName = addSelectedItemToCart()

    if (!selectedItemName) {
      return
    }

    snackbarMessage.value = `${selectedItemName} foi adicionado ao carrinho`
    isSnackbarVisible.value = true
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

    &__action {
      box-shadow: 0 12px 24px rgb(var(--color-ink-900-rgb, 25 25 25) / 0.12);
      text-transform: none;
      letter-spacing: 0;
      font-weight: 700;
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &__secondary-action {
      border-width: 1px;
      text-transform: none;
      letter-spacing: 0;
      font-weight: 600;
    }

    :deep(.product-details-page__secondary-action .v-btn__prepend),
    :deep(.product-details-page__secondary-action .v-btn__append) {
      opacity: 1;
    }

    &__empty {
      margin-top: 8px;
    }
  }
</style>
