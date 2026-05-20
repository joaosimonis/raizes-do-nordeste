export type MenuCategoryId = "lanches" | "bebidas" | "sobremesas";

export interface MenuCategory {
	id: MenuCategoryId;
	label: string;
}

export interface MenuItemImage {
	src: string;
	alt: string;
}

export interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	categoryId: MenuCategoryId;
	unitIds: string[];
	image: MenuItemImage;
}

export interface MenuItemSelectionState {
	itemId: string | null;
	quantity: number;
	notes: string;
}
