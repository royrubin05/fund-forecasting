export interface CashFlow {
    year: number;
import { Investment, FundAssumptions, CashFlowPoint } from '../types';

export function calculateTVPI(paidIn: number, distributed: number, nav: number): number {
    if (paidIn === 0) return 0;
    return (distributed + nav) / paidIn;
}

export function calculateDPI(paidIn: number, distributed: number): number {
    if (paidIn === 0) return 0;
    return distributed / paidIn;
}

export function calculateIRR(cashFlows: { year: number; amount: number }[]): number {
    // Simple Newton-Raphson approximation
    let guess = 0.1;
    const maxIterations = 100;
    const tolerance = 0.0001;

    for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let dNpv = 0;

        for (const cf of cashFlows) {
            const div = Math.pow(1 + guess, cf.year);
            npv += cf.amount / div;
            dNpv -= (cf.year * cf.amount) / (div * (1 + guess));
        }

        if (Math.abs(npv) < tolerance) return guess * 100;

        const newGuess = guess - npv / dNpv;
        if (Math.abs(newGuess - guess) < tolerance) return newGuess * 100;
        guess = newGuess;
    }

    return guess * 100;
}

export function generateProjections(
    investments: Investment[],
    assumptions: FundAssumptions,
    fundTermYears: number = 10
): CashFlowPoint[] {
    // Unrealized Gains: We need to model growth curve.
    // Let's assume linear growth to exit multiple for simplicity.

    let cumulativeInvested = 0;
    let cumulativeDistributed = 0;

    const results = yearlyFlows.map(yf => {
        cumulativeInvested += yf.call;
        cumulativeDistributed += yf.distribution;

        // Hacky NAV: Assume unexited investments are growing linearly
        // This requires iterating investments again per year.
        // Let's stick to the flows for the J-Curve first.

        return {
            year: yf.year,
            capitalCall: yf.call,
            distribution: yf.distribution,
            netCashFlow: yf.distribution - yf.call,
            cumulativeCall: cumulativeInvested,
            cumulativeDistribution: cumulativeDistributed,
        };
    });

    return results;
}
