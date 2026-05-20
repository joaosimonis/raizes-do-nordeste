import type { LoyaltyEnrollment, LoyaltyMember, LoyaltyProgram } from "@/features/loyalty/types/loyalty.types";

export const mockLoyaltyProgram: LoyaltyProgram = {
	id: "loyalty-raizes",
	name: "Raízes Premia",
	description: "Programa de fidelidade da Raízes do Nordeste para acúmulo de pontos e aplicação de descontos no pedido.",
	sections: [
		{
			id: "acumulo",
			title: "Como acumular pontos",
			content:
				"A cada pedido concluído, o cliente participante acumula 1 ponto por real gasto em produtos elegíveis da unidade selecionada.",
		},
		{
			id: "identificacao",
			title: "Como identificar sua participação",
			content:
				"O telefone informado no carrinho é usado para localizar o cadastro do participante e vincular os pontos acumulados naquele pedido.",
		},
		{
			id: "descontos",
			title: "Como os descontos funcionam",
			content:
				"Quando o cliente atinge uma das faixas de pontuação do programa, o desconto correspondente pode ser aplicado automaticamente no pedido ao ativar a participação no carrinho.",
		},
	],
	discountTiers: [
		{
			id: "discount-5",
			title: "5% de desconto",
			description: "Disponível ao atingir 40 pontos acumulados.",
			pointsRequired: 40,
			discountPercentage: 5,
		},
		{
			id: "discount-10",
			title: "10% de desconto",
			description: "Disponível ao atingir 90 pontos acumulados.",
			pointsRequired: 90,
			discountPercentage: 10,
		},
		{
			id: "discount-15",
			title: "15% de desconto",
			description: "Disponível ao atingir 140 pontos acumulados.",
			pointsRequired: 140,
			discountPercentage: 15,
		},
	],
};

export const mockLoyaltyMembers: LoyaltyMember[] = [
	{
		id: "member-001",
		phone: "81988887777",
		currentPoints: 22,
	},
	{
		id: "member-002",
		phone: "81997776655",
		currentPoints: 68,
	},
	{
		id: "member-003",
		phone: "71991234567",
		currentPoints: 128,
	},
];

export const mockLoyaltyEnrollment: LoyaltyEnrollment = {
	phone: "",
	participate: false,
};
