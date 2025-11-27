import { calculateTVPI, calculateDPI, calculateIRR, generateProjections } from './calculations';
import { Investment, FundAssumptions } from '../types';

describe('Fund Forecasting Engine (Phase 3)', () => {
    const mockAssumptions: FundAssumptions = {
        fundSize: 10000000, // $10M
        managementFee: 2.0,
        recyclingCap: 0,
        carry: 20,
        formationCosts: 0,
        annualExpenses: 0
    };

    const mockInvestments: Investment[] = [
        {
            id: '1',
            name: 'Winner',
            sector: 'Tech',
            stage: 'Seed',
            checkSize: 1000000,
            reserves: 0,
            entryYear: 1,
            exitYear: 5,
            realizedMultiple: 10.0, // 10x return
            unrealizedMultiple: 0
        },
        {
            id: '2',
            name: 'Loser',
            sector: 'Tech',
            stage: 'Seed',
            checkSize: 1000000,
            reserves: 0,
            entryYear: 1,
            exitYear: 3,
            realizedMultiple: 0.5, // 0.5x return
            unrealizedMultiple: 0
        },
        {
            id: '3',
            name: 'Active',
            sector: 'Bio',
            stage: 'A',
            checkSize: 1000000,
            reserves: 0,
            entryYear: 2,
            exitYear: 0, // Active
            realizedMultiple: 0,
            unrealizedMultiple: 2.0 // 2x paper
        }
    ];

    test('Calculates TVPI correctly', () => {
        // Total Invested = 3M
        // Realized = 10M (Winner) + 0.5M (Loser) = 10.5M
        // Unrealized = 2M (Active)
        // TVPI = (10.5 + 2) / 3 = 4.16x
        const tvpi = calculateTVPI(3000000, 10500000, 2000000);
        expect(tvpi).toBeCloseTo(4.166, 2);
    });

    test('Calculates DPI correctly', () => {
        // DPI = 10.5 / 3 = 3.5x
        const dpi = calculateDPI(3000000, 10500000);
        expect(dpi).toBe(3.5);
    });

    test('Generates Projections with J-Curve', () => {
        const projections = generateProjections(mockInvestments, mockAssumptions);

        // Year 0
        expect(projections[0].netCashFlow).toBe(0);

        // Year 1: 2M called (Winner + Loser), Fees (200k)
        // Total Call = 2.2M
        expect(projections[1].capitalCall).toBe(2200000);

        // Year 5: Winner exits (10M)
        expect(projections[5].distribution).toBe(10000000);
    });

    test('IRR Calculation', () => {
        const cashFlows = [
            { year: 0, amount: -100 },
            { year: 1, amount: -100 },
            { year: 2, amount: 50 },
            { year: 3, amount: 200 }
        ];
        const irr = calculateIRR(cashFlows);
        expect(irr).toBeGreaterThan(0);
    });
});
