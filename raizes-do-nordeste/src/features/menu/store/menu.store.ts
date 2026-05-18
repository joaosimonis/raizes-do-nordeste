import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { mockMenuCategories, mockMenuItems } from '@/features/menu/mocks/menu.mock'

export const useMenuStore = defineStore('menu', () => {
  const categories = ref(mockMenuCategories)
  const items = ref(mockMenuItems)
  const selectedMenuItemId = ref<string | null>(null)

  const selectedMenuItem = computed(() => {
    if (!selectedMenuItemId.value) {
      return null
    }

    return items.value.find(item => item.id === selectedMenuItemId.value) ?? null
  })

  const getMenuItemById = (itemId: string) => items.value.find(item => item.id === itemId) ?? null

  const setSelectedMenuItem = (itemId: string) => {
    selectedMenuItemId.value = itemId
  }

  const clearSelectedMenuItem = () => {
    selectedMenuItemId.value = null
  }

  return {
    categories,
    clearSelectedMenuItem,
    getMenuItemById,
    items,
    selectedMenuItem,
    selectedMenuItemId,
    setSelectedMenuItem,
  }
})
