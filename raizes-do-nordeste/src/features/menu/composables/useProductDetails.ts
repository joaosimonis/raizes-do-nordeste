import { storeToRefs } from 'pinia'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/features/menu/store/menu.store'

export const useProductDetails = () => {
  const route = useRoute()
  const menuStore = useMenuStore()
  const { selectedMenuItem, selectedMenuItemState } = storeToRefs(menuStore)

  watchEffect(() => {
    const routeItemId = typeof route.query.item === 'string' ? route.query.item : null

    if (!routeItemId) {
      return
    }

    if (selectedMenuItemState.value.itemId === routeItemId) {
      return
    }

    const item = menuStore.getMenuItemById(routeItemId)

    if (item) {
      menuStore.setSelectedMenuItem(item.id)
    }
  })

  const quantity = computed({
    get: () => selectedMenuItemState.value.quantity,
    set: (value: number) => {
      menuStore.setSelectedMenuItemQuantity(value)
    },
  })

  const notes = computed({
    get: () => selectedMenuItemState.value.notes,
    set: (value: string) => {
      menuStore.setSelectedMenuItemNotes(value)
    },
  })

  const canDecreaseQuantity = computed(() => quantity.value > 1)

  const increaseQuantity = () => {
    quantity.value += 1
  }

  const decreaseQuantity = () => {
    if (!canDecreaseQuantity.value) {
      return
    }

    quantity.value -= 1
  }

  return {
    canDecreaseQuantity,
    decreaseQuantity,
    increaseQuantity,
    notes,
    quantity,
    selectedMenuItem,
  }
}
