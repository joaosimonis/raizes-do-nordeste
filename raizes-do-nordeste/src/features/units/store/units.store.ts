import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { mockUnits } from '@/features/units/mocks/units.mock'

export const useUnitsStore = defineStore('units', () => {
  const units = ref(mockUnits)
  const selectedUnitId = ref<string | null>(null)

  const selectedUnit = computed(() => {
    if (!selectedUnitId.value) {
      return null
    }

    return units.value.find(unit => unit.id === selectedUnitId.value) ?? null
  })

  function getUnitById (unitId: string) {
    return units.value.find(unit => unit.id === unitId) ?? null
  }

  function setSelectedUnit (unitId: string) {
    selectedUnitId.value = unitId
  }

  function clearSelectedUnit () {
    selectedUnitId.value = null
  }

  return {
    clearSelectedUnit,
    getUnitById,
    selectedUnit,
    selectedUnitId,
    setSelectedUnit,
    units,
  }
})
