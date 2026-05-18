import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/features/cart/store/cart.store'

const DELIVERY_FEE = 8

export const useCart = () => {
  const router = useRouter()
  const cartStore = useCartStore()
  const { items, totals } = storeToRefs(cartStore)

  const hasItems = computed(() => items.value.length > 0)
  const deliveryFee = computed(() => hasItems.value ? DELIVERY_FEE : 0)
  const finalTotal = computed(() => totals.value.subtotal + deliveryFee.value)

  const decrementItemQuantity = (cartItemId: string) => {
    const item = items.value.find(entry => entry.id === cartItemId)

    if (!item) {
      return
    }

    if (item.quantity === 1) {
      cartStore.removeItem(cartItemId)
      return
    }

    cartStore.updateItemQuantity(cartItemId, item.quantity - 1)
  }

  const incrementItemQuantity = (cartItemId: string) => {
    const item = items.value.find(entry => entry.id === cartItemId)

    if (!item) {
      return
    }

    cartStore.updateItemQuantity(cartItemId, item.quantity + 1)
  }

  const removeItem = (cartItemId: string) => {
    cartStore.removeItem(cartItemId)
  }

  const goBack = () => {
    router.back()
  }

  const goToCheckout = () => {
    router.push({ name: 'checkout' })
  }

  return {
    decrementItemQuantity,
    deliveryFee,
    finalTotal,
    goBack,
    goToCheckout,
    hasItems,
    incrementItemQuantity,
    items,
    removeItem,
    totals,
  }
}
