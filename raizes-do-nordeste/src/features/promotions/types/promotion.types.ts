export type PromotionType = "percentage_discount";

export interface Promotion {
	id: string;
	title: string;
	description: string;
	highlightLabel: string;
	type: PromotionType;
	unitIds: string[];
	menuItemIds: string[];
	discountValue: number;
	isActive: boolean;
}
