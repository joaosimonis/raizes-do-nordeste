import type { Promotion } from "@/features/promotions/types/promotion.types";

export const mockPromotions: Promotion[] = [
	{
		id: "promotion-tapioca-week",
		title: "Festival da Tapioca",
		description: "Ganhe 10% de desconto na Tapioca Nordestina durante a campanha da semana.",
		highlightLabel: "Promoção ativa",
		type: "percentage_discount",
		unitIds: ["unit-recife-boa-vista", "unit-caruaru-centro", "unit-salvador-rio-vermelho"],
		menuItemIds: ["item-tapioca-nordestina"],
		discountValue: 10,
		isActive: true,
	},
];
