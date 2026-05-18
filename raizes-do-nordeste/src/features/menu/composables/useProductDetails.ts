import { storeToRefs } from 'pinia'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/features/cart/store/cart.store'
import { useMenuStore } from '@/features/menu/store/menu.store'
import { useUnitsStore } from '@/features/units/store/units.store'

export const useProductDetails = () => {
  const route = useRoute()
  const cartStore = useCartStore()
  const menuStore = useMenuStore()
  const unitsStore = useUnitsStore()
  const { selectedMenuItem, selectedMenuItemState } = storeToRefs(menuStore)
  const { selectedUnitId } = storeToRefs(unitsStore)

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

  const addSelectedItemToCart = () => {
    if (!selectedMenuItem.value) {
      return null
    }

    const selectedItemName = selectedMenuItem.value.name

    cartStore.addItem({
      item: selectedMenuItem.value,
      notes: notes.value,
      quantity: quantity.value,
      unitId: selectedUnitId.value,
    })

    menuStore.setSelectedMenuItemQuantity(1)
    menuStore.setSelectedMenuItemNotes('')

    return selectedItemName
  }

  return {
    addSelectedItemToCart,
    canDecreaseQuantity,
    decreaseQuantity,
    increaseQuantity,
    notes,
    quantity,
    selectedMenuItem,
  }
}
