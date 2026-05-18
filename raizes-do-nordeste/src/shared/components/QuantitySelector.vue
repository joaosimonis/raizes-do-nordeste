<template>
  <div class="quantity-selector">
    <v-btn
      :disabled="disableDecrement"
      icon="mdi-minus"
      rounded="lg"
      size="large"
      variant="tonal"
      @click="$emit('decrement')"
    />

    <span class="quantity-selector__value">{{ value }}</span>

    <v-btn
      icon="mdi-plus"
      rounded="lg"
      size="large"
      variant="tonal"
      @click="$emit('increment')"
    />
  </div>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    disableDecrement?: boolean
    value: number
  }>(), {
    disableDecrement: false,
  })

  defineEmits<{
    decrement: []
    increment: []
  }>()
</script>

<style scoped lang="scss">
  .quantity-selector {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;

    &__value {
      min-width: 2ch;
      color: var(--color-ink-950);
      font-size: 2rem;
      line-height: 1;
      font-weight: 700;
      text-align: center;
    }
  }
</style>
