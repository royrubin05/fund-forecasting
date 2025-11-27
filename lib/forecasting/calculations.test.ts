import { calculateIRR, calculateTVPI, calculateDPI, generateProjections } from './calculations';

describe('Financial Calculations', () => {
    test('calculateTVPI', () => {
        // Paid In: 100, Distributed: 20, NAV: 90 -> (20 + 90) / 100 = 1.1x
        expect(calculateTVPI(100, 20, 90)).toBe(1.1);
        expect(calculateTVPI(0, 0, 0)).toBe(0);
    });

    test('calculateDPI', () => {
        // Paid In: 100, Distributed: 20 -> 20 / 100 = 0.2x
        expect(calculateDPI(100, 20)).toBe(0.2);
    });

    test('calculateIRR', () => {
        // Simple case: Invest 100, Return 110 next year -> 10% IRR
        const cashFlows = [
            { year: 0, amount: -100 },
            { year: 1, amount: 110 }
        ];
        const irr = calculateIRR(cashFlows);
        expect(irr).toBeCloseTo(10.0, 1);
    });

    test('generateProjections', () => {
        const investments = [
            { checkSize: 100, reserves: 0, exitMultiple: 2, exitYear: 5 }
        ];
        const fundSize = 1000;
        const managementFee = 0; // Simplify

        const projections = generateProjections(investments, fundSize, managementFee, 10);

        // Check Year 1 (Investment)
        expect(projections[1].capitalCall).toBe(100);

        // Check Year 5 (Exit)
        expect(projections[5].distribution).toBe(200); // 100 * 2x
    });
});
