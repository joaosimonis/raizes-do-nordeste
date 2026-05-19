import type { MenuCategory, MenuItem } from "@/features/menu/types/menu.types";
import acarajeImage from "@/assets/images/foods/acaraje.png";
import baiaoDeDoisImage from "@/assets/images/foods/baiao-de-dois.png";
import boloDeRoloImage from "@/assets/images/foods/bolo-de-rolo.png";
import cafeCoadoImage from "@/assets/images/foods/cafe-coado.png";
import cartolaImage from "@/assets/images/foods/cartola.png";
import sucoDeCajuImage from "@/assets/images/foods/suco-de-caju.png";
import tapiocaNordestinaImage from "@/assets/images/foods/tapioca-nordestina.png";
import vatapaImage from "@/assets/images/foods/vatapa.png";

export const mockMenuCategories: MenuCategory[] = [
	{
		id: "lanches",
		label: "Lanches",
	},
	{
		id: "bebidas",
		label: "Bebidas",
	},
	{
		id: "sobremesas",
		label: "Sobremesas",
	},
];

export const mockMenuItems: MenuItem[] = [
	{
		id: "item-tapioca-nordestina",
		name: "Tapioca Nordestina",
		image: {
			src: tapiocaNordestinaImage,
			alt: "Tapioca Nordestina servida em prato claro",
		},
		description: "Tapioca recheada com queijo coalho e carne de sol desfiada.",
		price: 18.9,
		categoryId: "lanches",
		unitIds: ["unit-recife-boa-vista", "unit-caruaru-centro", "unit-salvador-rio-vermelho"],
	},
	{
		id: "item-baiao-de-dois",
		name: "Baião de dois",
		image: {
			src: baiaoDeDoisImage,
			alt: "Porção de baião de dois com apresentação regional",
		},
		description: "Porção de baião de dois cremoso com toque de manteiga da terra.",
		price: 22.5,
		categoryId: "lanches",
		unitIds: ["unit-recife-boa-vista", "unit-caruaru-centro", "unit-fortaleza-aldeota"],
	},
	{
		id: "item-acaraje",
		name: "Acarajé",
		image: {
			src: acarajeImage,
			alt: "Acarajé tradicional com recheio",
		},
		description: "Acarajé tradicional servido com vatapá e salada.",
		price: 19.9,
		categoryId: "lanches",
		unitIds: ["unit-salvador-rio-vermelho", "unit-recife-boa-vista"],
	},
	{
		id: "item-vatapa",
		name: "Vatapá",
		image: {
			src: vatapaImage,
			alt: "Porção de vatapá cremoso",
		},
		description: "Porção individual de vatapá cremoso com sabor marcante.",
		price: 16.9,
		categoryId: "lanches",
		unitIds: ["unit-salvador-rio-vermelho", "unit-recife-boa-vista"],
	},
	{
		id: "item-suco-caju",
		name: "Suco de Caju",
		image: {
			src: sucoDeCajuImage,
			alt: "Copo de suco de caju gelado",
		},
		description: "Suco gelado de caju servido em copo de 300 ml.",
		price: 8.5,
		categoryId: "bebidas",
		unitIds: ["unit-recife-boa-vista", "unit-caruaru-centro", "unit-salvador-rio-vermelho", "unit-fortaleza-aldeota"],
	},
	{
		id: "item-cafe-coado",
		name: "Café Coado",
		image: {
			src: cafeCoadoImage,
			alt: "Xícara de café coado quente",
		},
		description: "Café coado na hora, quente e encorpado.",
		price: 5.9,
		categoryId: "bebidas",
		unitIds: ["unit-recife-boa-vista", "unit-caruaru-centro", "unit-fortaleza-aldeota"],
	},
	{
		id: "item-bolo-de-rolo",
		name: "Bolo de Rolo",
		image: {
			src: boloDeRoloImage,
			alt: "Fatia de bolo de rolo com goiabada",
		},
		description: "Fatia tradicional de bolo de rolo com goiabada.",
		price: 11.9,
		categoryId: "sobremesas",
		unitIds: ["unit-recife-boa-vista", "unit-caruaru-centro", "unit-fortaleza-aldeota"],
	},
	{
		id: "item-cartola",
		name: "Cartola",
		image: {
			src: cartolaImage,
			alt: "Sobremesa cartola com banana e queijo",
		},
		description: "Banana frita com queijo, canela e açúcar.",
		price: 14.9,
		categoryId: "sobremesas",
		unitIds: ["unit-recife-boa-vista", "unit-salvador-rio-vermelho"],
	},
];
