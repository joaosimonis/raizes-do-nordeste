import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { mockLoyaltyEnrollment, mockLoyaltyMembers, mockLoyaltyProgram } from "@/features/loyalty/mocks/loyalty.mock";
import type { LoyaltyDiscountPreview, LoyaltyEnrollment } from "@/features/loyalty/types/loyalty.types";

const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export const useLoyaltyStore = defineStore("loyalty", () => {
	const program = ref(mockLoyaltyProgram);
	const members = ref(mockLoyaltyMembers);
	const enrollment = ref<LoyaltyEnrollment>({
		...mockLoyaltyEnrollment,
	});

	const normalizedPhone = computed(() => normalizePhone(enrollment.value.phone));
	const identifiedMember = computed(() => members.value.find((member) => member.phone === normalizedPhone.value) ?? null);
	const currentPoints = computed(() => identifiedMember.value?.currentPoints ?? 0);
	const isEnrollmentValid = computed(() => !enrollment.value.participate || normalizedPhone.value.length >= 10);
	const availableDiscountTier = computed(
		() =>
			[...program.value.discountTiers]
				.sort((currentTier, nextTier) => nextTier.pointsRequired - currentTier.pointsRequired)
				.find((tier) => tier.pointsRequired <= currentPoints.value) ?? null
	);

	const setPhone = (phone: string) => {
		enrollment.value.phone = phone;
	};

	const setParticipate = (participate: boolean) => {
		enrollment.value.participate = participate;
	};

	const resetEnrollment = () => {
		enrollment.value = {
			...mockLoyaltyEnrollment,
		};
	};

	const getDiscountPreview = (orderTotal: number): LoyaltyDiscountPreview => {
		const appliedDiscountTier = enrollment.value.participate ? availableDiscountTier.value : null;
		const discountAmount = appliedDiscountTier ? Number(((orderTotal * appliedDiscountTier.discountPercentage) / 100).toFixed(2)) : 0;

		return {
			appliedDiscountTier,
			discountAmount,
		};
	};

	return {
		availableDiscountTier,
		currentPoints,
		enrollment,
		getDiscountPreview,
		identifiedMember,
		isEnrollmentValid,
		members,
		normalizedPhone,
		program,
		resetEnrollment,
		setParticipate,
		setPhone,
	};
});
