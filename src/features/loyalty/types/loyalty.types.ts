export interface LoyaltyDiscountTier {
	id: string;
	title: string;
	description: string;
	pointsRequired: number;
	discountPercentage: number;
}

export interface LoyaltyProgramSection {
	id: string;
	title: string;
	content: string;
}

export interface LoyaltyProgram {
	id: string;
	name: string;
	description: string;
	sections: LoyaltyProgramSection[];
	discountTiers: LoyaltyDiscountTier[];
}

export interface LoyaltyMember {
	id: string;
	phone: string;
	currentPoints: number;
}

export interface LoyaltyEnrollment {
	phone: string;
	participate: boolean;
}

export interface LoyaltyDiscountPreview {
	appliedDiscountTier: LoyaltyDiscountTier | null;
	discountAmount: number;
}
