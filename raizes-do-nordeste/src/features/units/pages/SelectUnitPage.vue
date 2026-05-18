<template>
  <v-container class="select-unit-page">
    <div class="select-unit-page__header">
      <h1 class="select-unit-page__title">Raízes do Nordeste</h1>
      <p class="select-unit-page__subtitle">Escolha a unidade mais próxima</p>
    </div>

    <v-text-field
      v-model="search"
      class="select-unit-page__search"
      clearable
      density="comfortable"
      hide-details
      placeholder="Buscar unidade"
      prepend-inner-icon="mdi-magnify"
      rounded="lg"
      variant="outlined"
    />

    <div class="select-unit-page__list">
      <UnitCard
        v-for="unit in filteredUnits"
        :key="unit.id"
        :unit="unit"
        @select="handleSelectUnit"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import type { Unit } from '@/features/units/types/unit.types'
  import { useRouter } from 'vue-router'
  import UnitCard from '@/features/units/components/UnitCard.vue'
  import { useUnits } from '@/features/units/composables/useUnits'

  const router = useRouter()
  const { filteredUnits, search, unitsStore } = useUnits()

  function handleSelectUnit (unit: Unit) {
    unitsStore.setSelectedUnit(unit.id)

    router.push({
      name: 'menu',
      query: { unit: unit.id },
    })
  }
</script>

<style scoped lang="scss">
  .select-unit-page {
    min-height: 100vh;
    max-width: 860px;
    margin: 0 auto;
    padding: 16px;

    &__header {
      display: grid;
      gap: 18px;
      margin-bottom: 24px;
    }

    &__title {
      margin: 0;
      color: var(--color-ink-950);
      font-size: 2rem;
      line-height: 1.05;
      font-weight: 700;
    }

    &__subtitle {
      margin: 12px 0 0;
      color: var(--color-stone-600);
      font-size: 1rem;
      line-height: 1.35;
    }

    &__search {
      margin-bottom: 20px;
    }

    &__list {
      display: grid;
      gap: 16px;
    }
  }
</style>
