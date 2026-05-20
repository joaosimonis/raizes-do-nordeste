<template>
	<v-dialog
		:model-value="modelValue"
		max-width="560"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<v-card
			class="privacy-terms-dialog"
			rounded="xl"
		>
			<div class="privacy-terms-dialog__header">
				<p class="privacy-terms-dialog__eyebrow">LGPD e privacidade</p>
				<h2 class="privacy-terms-dialog__title">{{ terms.title }}</h2>
				<p class="privacy-terms-dialog__meta">Versão {{ terms.version }} • Atualizado em {{ terms.lastUpdatedAt }}</p>
				<p class="privacy-terms-dialog__introduction">{{ terms.introduction }}</p>
			</div>

			<div class="privacy-terms-dialog__sections">
				<div
					v-for="section in terms.sections"
					:key="section.id"
					class="privacy-terms-dialog__section"
				>
					<p class="privacy-terms-dialog__section-title">{{ section.title }}</p>
					<p class="privacy-terms-dialog__section-content">{{ section.content }}</p>
				</div>
			</div>

			<div class="privacy-terms-dialog__consents">
				<p class="privacy-terms-dialog__consents-title">Confirmações de consentimento</p>

				<div
					v-for="option in consentOptions"
					:key="option.id"
					class="privacy-terms-dialog__consent-card"
				>
					<v-checkbox
						v-model="selectedConsentIds"
						class="privacy-terms-dialog__checkbox"
						color="primary"
						hide-details
						:label="option.title"
						:required="option.required"
						:value="option.id"
					/>

					<div class="privacy-terms-dialog__consent-copy">
						<p
							v-if="option.required"
							class="privacy-terms-dialog__consent-badge"
						>
							Obrigatório
						</p>
						<p class="privacy-terms-dialog__checkbox-description">{{ option.description }}</p>
					</div>
				</div>
			</div>

			<div class="privacy-terms-dialog__actions">
				<v-btn
					rounded="xl"
					text="Fechar"
					variant="text"
					@click="$emit('update:modelValue', false)"
				/>
				<v-btn
					color="primary"
					:disabled="!canAccept"
					rounded="xl"
					text="Aceitar e continuar"
					variant="flat"
					@click="handleAccept"
				/>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { PrivacyConsentId, PrivacyConsentOption, PrivacyTerms } from "@/features/privacy/types/privacy.types";

const props = defineProps<{
	consentOptions: PrivacyConsentOption[];
	modelValue: boolean;
	selectedIds?: PrivacyConsentId[];
	terms: PrivacyTerms;
}>();

const emit = defineEmits<{
	accept: [consentIds: PrivacyConsentId[]];
	"update:modelValue": [value: boolean];
}>();

const selectedConsentIds = ref<PrivacyConsentId[]>([]);

watch(
	() => [props.modelValue, props.selectedIds] as const,
	([isOpen, selectedIds]) => {
		if (!isOpen) {
			return;
		}

		selectedConsentIds.value = selectedIds ? [...selectedIds] : [];
	},
	{ immediate: true }
);

const requiredConsentIds = computed(() => props.consentOptions.filter((option) => option.required).map((option) => option.id));
const canAccept = computed(() => requiredConsentIds.value.every((consentId) => selectedConsentIds.value.includes(consentId)));

const handleAccept = () => {
	if (!canAccept.value) {
		return;
	}

	emit("accept", selectedConsentIds.value);
};
</script>

<style scoped lang="scss">
.privacy-terms-dialog {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;

	&__header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	&__eyebrow {
		color: var(--color-stone-600);
		font-size: 0.86rem;
		line-height: 1.2;
		font-weight: 600;
		text-transform: uppercase;
	}

	&__title {
		color: var(--color-ink-950);
		font-size: 1.35rem;
		line-height: 1.15;
		font-weight: 700;
	}

	&__meta {
		color: var(--color-stone-600);
		font-size: 0.88rem;
		line-height: 1.25;
	}

	&__introduction {
		color: var(--color-ink-950);
		font-size: 0.96rem;
		line-height: 1.5;
	}

	&__sections {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	&__section {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	&__section-title {
		color: var(--color-ink-950);
		font-size: 0.98rem;
		line-height: 1.25;
		font-weight: 700;
	}

	&__section-content {
		color: var(--color-stone-600);
		font-size: 0.92rem;
		line-height: 1.45;
	}

	&__consents {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 4px;
	}

	&__consents-title {
		color: var(--color-ink-950);
		font-size: 1rem;
		line-height: 1.2;
		font-weight: 700;
	}

	&__consent-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 12px 14px;
		border: 1px solid rgb(var(--color-ink-900-rgb, 25 25 25) / 0.08);
		border-radius: 16px;
		background: var(--color-white);
	}

	&__checkbox {
		margin-top: 0;
	}

	&__consent-copy {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	&__consent-badge {
		background: rgb(var(--v-theme-primary) / 0.08);
		color: rgb(var(--v-theme-primary));
		font-size: 0.78rem;
		line-height: 1.1;
		font-weight: 700;
	}

	&__checkbox-description {
		color: var(--color-stone-600);
		font-size: 0.88rem;
		line-height: 1.4;
	}

	&__actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding-top: 4px;
	}
}
</style>
