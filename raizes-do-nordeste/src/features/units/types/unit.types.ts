export type ServiceChannel = 'app' | 'totem' | 'web' | 'balcao'

export type UnitStatus = 'aberta' | 'fechada' | 'pausada'

export type KitchenType = 'completa' | 'reduzida'

export interface Unit {
  id: string
  name: string
  city: string
  state: string
  neighborhood: string
  status: UnitStatus
  kitchenType: KitchenType
  supportedChannels: ServiceChannel[]
  pickupEstimateMinutes: number
  businessHours: string
}
