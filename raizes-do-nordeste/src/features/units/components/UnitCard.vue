<template>
  <v-card class="unit-card" rounded="xl" variant="outlined">
    <v-avatar class="unit-card__media" rounded="lg" size="88">
      <v-icon icon="mdi-storefront-outline" size="34" />
    </v-avatar>

    <div class="unit-card__content">
      <div class="unit-card__header">
        <h2 class="unit-card__title">{{ unit.name }}</h2>

        <v-chip class="unit-card__status" size="small" variant="tonal">
          {{ unit.neighborhood }}
        </v-chip>
      </div>

      <p class="unit-card__address">{{ unit.address }}</p>
      <p class="unit-card__location">{{ unit.city }} - {{ unit.state }}</p>

      <div class="unit-card__footer">
        <span class="unit-card__meta">
          {{ unit.pickupEstimateMinutes }} min
        </span>

        <v-btn
          class="unit-card__action"
          color="primary"
          rounded="pill"
          text="Selecionar"
          variant="flat"
          @click="$emit('select', unit)"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import type { Unit } from '@/features/units/types/unit.types'

  defineProps<{
    unit: Unit
  }>()

  defineEmits<{
    select: [unit: Unit]
  }>()
</script>

<style scoped lang="scss">
  .unit-card {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 16px;
    border-color: var(--color-ink-900);

    &__media {
      border: 2px solid var(--color-ink-900);
      background: var(--color-sand-100);
      color: var(--color-earth-700);
    }

    &__content {
      min-width: 0;
    }

    &__header {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &__title,
    &__address,
    &__location {
      margin: 0;
      color: var(--color-ink-950);
    }

    &__title {
      font-size: 1rem;
      line-height: 1.25;
      font-weight: 700;
    }

    &__status {
      flex-shrink: 0;
    }

    &__address,
    &__location {
      font-size: 0.95rem;
      line-height: 1.4;
    }

    &__location {
      margin-top: 4px;
      color: var(--color-stone-500);
    }

    &__footer {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
      margin-top: 14px;
    }

    &__meta {
      color: var(--color-stone-500);
      font-size: 0.9rem;
      font-weight: 600;
    }

    &__action {
      text-transform: none;
      letter-spacing: 0;
      font-weight: 700;
    }
  }

  @media (min-width: 768px) {
    .unit-card {
      gap: 20px;
      padding: 20px;

      &__media {
        width: 108px !important;
        height: 108px !important;
      }

      &__title {
        font-size: 1.15rem;
      }
    }
  }
</style>
