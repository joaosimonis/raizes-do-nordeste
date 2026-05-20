export type PrivacyConsentId = "pedido_e_pagamento" | "programa_fidelidade" | "campanhas_personalizadas";

export interface PrivacyTermsSection {
	id: string;
	title: string;
	content: string;
}

export interface PrivacyTerms {
	id: string;
	title: string;
	version: string;
	lastUpdatedAt: string;
	introduction: string;
	sections: PrivacyTermsSection[];
}

export interface PrivacyConsentOption {
	id: PrivacyConsentId;
	title: string;
	description: string;
	required: boolean;
}

export interface PrivacyConsentState {
	acceptedAt: string | null;
	acceptedConsentIds: PrivacyConsentId[];
	termsVersion: string;
}
