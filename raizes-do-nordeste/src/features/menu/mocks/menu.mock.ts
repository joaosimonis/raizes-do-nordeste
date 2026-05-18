import type { MenuCategory, MenuItem } from '@/features/menu/types/menu.types'

export const mockMenuCategories: MenuCategory[] = [
  {
    id: 'lanches',
    label: 'Lanches',
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
  },
  {
    id: 'sobremesas',
    label: 'Sobremesas',
  },
]

export const mockMenuItems: MenuItem[] = [
  {
    id: 'item-tapioca-nordestina',
    name: 'Tapioca Nordestina',
    description: 'Tapioca recheada com queijo coalho e carne de sol desfiada.',
    price: 18.9,
    categoryId: 'lanches',
    unitIds: [
      'unit-recife-boa-vista',
      'unit-caruaru-centro',
      'unit-salvador-rio-vermelho',
    ],
  },
  {
    id: 'item-baiao-de-dois',
    name: 'Baião de dois',
    description: 'Porção de baião de dois cremoso com toque de manteiga da terra.',
    price: 22.5,
    categoryId: 'lanches',
    unitIds: [
      'unit-recife-boa-vista',
      'unit-caruaru-centro',
      'unit-fortaleza-aldeota',
    ],
  },
  {
    id: 'item-acaraje',
    name: 'Acarajé',
    description: 'Acarajé tradicional servido com vatapá e salada.',
    price: 19.9,
    categoryId: 'lanches',
    unitIds: [
      'unit-salvador-rio-vermelho',
      'unit-recife-boa-vista',
    ],
  },
  {
    id: 'item-vatapa',
    name: 'Vatapá',
    description: 'Porção individual de vatapá cremoso com sabor marcante.',
    price: 16.9,
    categoryId: 'lanches',
    unitIds: [
      'unit-salvador-rio-vermelho',
      'unit-recife-boa-vista',
    ],
  },
  {
    id: 'item-suco-caja',
    name: 'Suco de Cajá',
    description: 'Suco gelado de cajá servido em copo de 300 ml.',
    price: 8.5,
    categoryId: 'bebidas',
    unitIds: [
      'unit-recife-boa-vista',
      'unit-caruaru-centro',
      'unit-salvador-rio-vermelho',
      'unit-fortaleza-aldeota',
    ],
  },
  {
    id: 'item-cafe-coado',
    name: 'Café Coado',
    description: 'Café coado na hora, quente e encorpado.',
    price: 5.9,
    categoryId: 'bebidas',
    unitIds: [
      'unit-recife-boa-vista',
      'unit-caruaru-centro',
      'unit-fortaleza-aldeota',
    ],
  },
  {
    id: 'item-bolo-de-rolo',
    name: 'Bolo de Rolo',
    description: 'Fatia tradicional de bolo de rolo com goiabada.',
    price: 11.9,
    categoryId: 'sobremesas',
    unitIds: [
      'unit-recife-boa-vista',
      'unit-caruaru-centro',
      'unit-fortaleza-aldeota',
    ],
  },
  {
    id: 'item-cartola',
    name: 'Cartola',
    description: 'Banana frita com queijo, canela e açúcar.',
    price: 14.9,
    categoryId: 'sobremesas',
    unitIds: [
      'unit-recife-boa-vista',
      'unit-salvador-rio-vermelho',
    ],
  },
]
