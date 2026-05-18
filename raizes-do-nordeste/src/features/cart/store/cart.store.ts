import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem, CartState, CartTotals } from '@/features/cart/types/cart.types'
import type { MenuItem } from '@/features/menu/types/menu.types'

const createCartItemId = (menuItemId: string, notes: string) => {
  const normalizedNotes = notes.trim().toLowerCase()

  return `${menuItemId}::${normalizedNotes}`
}

export const useCartStore = defineStore('cart', () => {
  const state = ref<CartState>({
    unitId: null,
    items: [],
  })

  const items = computed(() => state.value.items)
  const unitId = computed(() => state.value.unitId)

  const totals = computed<CartTotals>(() => {
    const subtotal = items.value.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)
    const totalItems = items.value.reduce((sum, item) => sum + item.quantity, 0)

    return {
      subtotal,
      total: subtotal,
      totalItems,
    }
  })

  const addItem = (params: {
    item: MenuItem
    notes: string
    quantity: number
    unitId: string | null
  }) => {
    const normalizedQuantity = Math.max(1, params.quantity)
    const normalizedNotes = params.notes.trim()
    const cartItemId = createCartItemId(params.item.id, normalizedNotes)

    if (state.value.unitId && params.unitId && state.value.unitId !== params.unitId) {
      state.value = {
        unitId: params.unitId,
        items: [],
      }
    }

    if (!state.value.unitId) {
      state.value.unitId = params.unitId
    }

    const existingItem = state.value.items.find(item => item.id === cartItemId)

    if (existingItem) {
      existingItem.quantity += normalizedQuantity
      return
    }

    const nextItem: CartItem = {
      id: cartItemId,
      image: params.item.image,
      menuItemId: params.item.id,
      name: params.item.name,
      notes: normalizedNotes,
      quantity: normalizedQuantity,
      unitPrice: params.item.price,
    }

    state.value.items.push(nextItem)
  }

  const removeItem = (cartItemId: string) => {
    state.value.items = state.value.items.filter(item => item.id !== cartItemId)

    if (state.value.items.length === 0) {
      state.value.unitId = null
    }
  }

  const updateItemQuantity = (cartItemId: string, quantity: number) => {
    const item = state.value.items.find(entry => entry.id === cartItemId)

    if (!item) {
      return
    }

    item.quantity = Math.max(1, quantity)
  }

  const clearCart = () => {
    state.value = {
      unitId: null,
      items: [],
    }
  }

  return {
    addItem,
    clearCart,
    items,
    removeItem,
    state,
    totals,
    unitId,
    updateItemQuantity,
  }
})
