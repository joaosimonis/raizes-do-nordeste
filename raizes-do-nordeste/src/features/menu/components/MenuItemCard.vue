<script setup lang="ts">
  import type { MenuItem } from '@/features/menu/types/menu.types'
  import { formatValueToBRL } from '@/shared/utils/formatCurrency'

  defineProps<{
    item: MenuItem
  }>()

  defineEmits<{
    add: [item: MenuItem]
    open: [item: MenuItem]
  }>()
</script>

<template>
  <v-card
    class="menu-item-card"
    rounded="xl"
    variant="outlined"
    @click="$emit('open', item)"
  >
    <v-avatar class="menu-item-card__media" rounded="lg" size="88">
      <v-icon icon="mdi-food-outline" size="34" />
    </v-avatar>

    <div class="menu-item-card__body">
      <h2 class="menu-item-card__title">{{ item.name }}</h2>
      <p class="menu-item-card__price">{{ formatValueToBRL(item.price) }}</p>
    </div>

    <v-btn
      class="menu-item-card__action"
      color="primary"
      rounded="lg"
      text="Adicionar"
      variant="flat"
      @click.stop="$emit('add', item)"
    />
  </v-card>
</template>

<style scoped lang="scss">
  .menu-item-card {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 16px;
    border-color: var(--color-ink-900);
    cursor: pointer;

    &__media {
      border: 2px solid var(--color-ink-900);
      background: var(--color-sand-100);
      color: var(--color-earth-700);
    }

    &__body {
      flex: 1;
      min-width: 0;
    }

    &__title,
    &__price {
      margin: 0;
      color: var(--color-ink-950);
    }

    &__title {
      font-size: 1rem;
      line-height: 1.3;
      font-weight: 600;
    }

    &__price {
      margin-top: 10px;
      font-size: 1.5rem;
      line-height: 1;
      font-weight: 700;
    }

    &__action {
      text-transform: none;
      letter-spacing: 0;
      font-weight: 700;
    }
  }

  @media (min-width: 768px) {
    .menu-item-card {
      gap: 20px;
      padding: 20px;

      &__media {
        width: 96px !important;
        height: 96px !important;
      }

      &__title {
        font-size: 1.1rem;
      }

      &__price {
        font-size: 2.3rem;
      }
    }
  }
</style>
