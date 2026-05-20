import type { Unit } from "@/features/units/types/unit.types";
import unidadeCaruaruImage from "@/assets/images/units/unidade-centro.png";
import unidadeFortalezaImage from "@/assets/images/units/unidade-fortaleza.png";
import unidadeRecifeImage from "@/assets/images/units/unidade-recife.png";
import unidadeSalvadorImage from "@/assets/images/units/unidade-salvador.png";

export const mockUnits: Unit[] = [
	{
		id: "unit-recife-boa-vista",
		name: "Raízes Recife",
		image: {
			src: unidadeRecifeImage,
			alt: "Fachada da unidade Raízes Recife Boa Vista",
		},
		address: "Rua da Aurora, 245",
		city: "Recife",
		state: "PE",
		neighborhood: "Boa Vista",
		pickupEstimateMinutes: 18,
	},
	{
		id: "unit-caruaru-centro",
		name: "Raízes Caruaru",
		image: {
			src: unidadeCaruaruImage,
			alt: "Fachada da unidade Raízes Caruaru Centro",
		},
		address: "Avenida Rio Branco, 88",
		city: "Caruaru",
		state: "PE",
		neighborhood: "Centro",
		pickupEstimateMinutes: 14,
	},
	{
		id: "unit-salvador-rio-vermelho",
		name: "Raízes Salvador",
		image: {
			src: unidadeSalvadorImage,
			alt: "Fachada da unidade Raízes Salvador Rio Vermelho",
		},
		address: "Rua Odilon Santos, 62",
		city: "Salvador",
		state: "BA",
		neighborhood: "Rio Vermelho",
		pickupEstimateMinutes: 22,
	},
	{
		id: "unit-fortaleza-aldeota",
		name: "Raízes Fortaleza",
		image: {
			src: unidadeFortalezaImage,
			alt: "Fachada da unidade Raízes Fortaleza Aldeota",
		},
		address: "Avenida Santos Dumont, 1410",
		city: "Fortaleza",
		state: "CE",
		neighborhood: "Aldeota",
		pickupEstimateMinutes: 16,
	},
];
