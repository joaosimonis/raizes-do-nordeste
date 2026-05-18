export type MenuCategoryId = 'lanches' | 'bebidas' | 'sobremesas'

export interface MenuCategory {
  id: MenuCategoryId
  label: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  categoryId: MenuCategoryId
  unitIds: string[]
  image?: string
}
