import type { PrivacyConsentOption, PrivacyConsentState, PrivacyTerms } from "@/features/privacy/types/privacy.types";

export const mockPrivacyTerms: PrivacyTerms = {
	id: "privacy-terms-raizes",
	title: "Consentimento para tratamento de dados pessoais",
	version: "1.0",
	lastUpdatedAt: "2026-05-19",
	introduction:
		"Para concluir seu pedido, a Raízes do Nordeste precisa tratar os dados informados durante a navegação, identificação do cliente, pagamento e acompanhamento da retirada.",
	sections: [
		{
			id: "dados-coletados",
			title: "Quais dados podem ser utilizados",
			content:
				"Nome, telefone, itens escolhidos, unidade selecionada, informações do pedido e dados necessários para registrar a solicitação de pagamento no provedor externo.",
		},
		{
			id: "finalidade-pedido",
			title: "Finalidade do uso",
			content:
				"Esses dados são utilizados para processar o pedido, solicitar o pagamento, atualizar o status da preparação e permitir a retirada correta na unidade.",
		},
		{
			id: "integracao-externa",
			title: "Compartilhamento com serviços externos",
			content:
				"Os dados estritamente necessários para cobrança são compartilhados com o provedor de pagamento. O processamento financeiro ocorre fora do sistema principal da Raízes do Nordeste.",
		},
		{
			id: "direitos-titular",
			title: "Direitos do titular",
			content:
				"O cliente pode solicitar informações sobre o tratamento dos seus dados, revisão dos consentimentos opcionais e esclarecimentos sobre o uso para campanhas ou fidelização.",
		},
	],
};

export const mockPrivacyConsentOptions: PrivacyConsentOption[] = [
	{
		id: "pedido_e_pagamento",
		title: "Tratamento de dados para pedido e pagamento",
		description: "Obrigatório para registrar o pedido, solicitar o pagamento ao provedor externo e acompanhar a retirada.",
		required: true,
	},
	{
		id: "programa_fidelidade",
		title: "Participação no programa de fidelidade",
		description: "Permite acumular pontos, acompanhar benefícios e manter o histórico de recompensas vinculado ao cliente.",
		required: false,
	},
	{
		id: "campanhas_personalizadas",
		title: "Recebimento de campanhas e ofertas personalizadas",
		description: "Autoriza o uso de preferências de consumo e frequência de compra para campanhas segmentadas.",
		required: false,
	},
];

export const mockPrivacyConsentState: PrivacyConsentState = {
	acceptedAt: null,
	acceptedConsentIds: [],
	termsVersion: mockPrivacyTerms.version,
};
