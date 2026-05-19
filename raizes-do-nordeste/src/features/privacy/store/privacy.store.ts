import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockPrivacyConsentOptions, mockPrivacyConsentState, mockPrivacyTerms } from "@/features/privacy/mocks/privacy.mock";
import type { PrivacyConsentId } from "@/features/privacy/types/privacy.types";

export const usePrivacyStore = defineStore("privacy", () => {
	const terms = ref(mockPrivacyTerms);
	const consentOptions = ref(mockPrivacyConsentOptions);
	const consentState = ref(mockPrivacyConsentState);

	const requiredConsentIds = computed(() => consentOptions.value.filter((option) => option.required).map((option) => option.id));
	const optionalConsentOptions = computed(() => consentOptions.value.filter((option) => !option.required));
	const hasAcceptedRequiredConsents = computed(() => requiredConsentIds.value.every((consentId) => consentState.value.acceptedConsentIds.includes(consentId)));

	const hasAcceptedConsent = (consentId: PrivacyConsentId) => consentState.value.acceptedConsentIds.includes(consentId);

	const acceptConsents = (consentIds: PrivacyConsentId[]) => {
		const normalizedConsentIds = Array.from(new Set([...requiredConsentIds.value, ...consentIds]));

		consentState.value = {
			acceptedAt: new Date().toISOString(),
			acceptedConsentIds: normalizedConsentIds,
			termsVersion: terms.value.version,
		};
	};

	const acceptRequiredConsents = () => {
		acceptConsents(requiredConsentIds.value);
	};

	const revokeOptionalConsent = (consentId: PrivacyConsentId) => {
		if (requiredConsentIds.value.includes(consentId)) {
			return;
		}

		consentState.value = {
			...consentState.value,
			acceptedConsentIds: consentState.value.acceptedConsentIds.filter((acceptedConsentId) => acceptedConsentId !== consentId),
		};
	};

	const resetConsentState = () => {
		consentState.value = {
			...mockPrivacyConsentState,
			acceptedConsentIds: [...mockPrivacyConsentState.acceptedConsentIds],
		};
	};

	return {
		acceptConsents,
		acceptRequiredConsents,
		consentOptions,
		consentState,
		hasAcceptedConsent,
		hasAcceptedRequiredConsents,
		optionalConsentOptions,
		requiredConsentIds,
		resetConsentState,
		revokeOptionalConsent,
		terms,
	};
});
