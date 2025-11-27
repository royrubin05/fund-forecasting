import { Investment, FundAssumptions, CashFlowPoint } from '../types';

export interface CashFlow {
    year: number;
    amount: number;
}

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
    // Initialize yearly flows
    const yearlyFlows = Array.from({ length: fundTermYears + 1 }, (_, i) => ({
        year: i,
        call: 0,
        distribution: 0,
        nav: 0
    }));

    // Aggregate investment flows
    investments.forEach(inv => {
        // Capital Calls (Entry)
        if (inv.entryYear <= fundTermYears) {
            yearlyFlows[inv.entryYear].call += inv.checkSize + inv.reserves;
        }

        // Distributions (Exit)
        if (inv.exitYear > 0 && inv.exitYear <= fundTermYears) {
            // Simple model: exit value = cost * realizedMultiple
            const exitValue = (inv.checkSize + inv.reserves) * inv.realizedMultiple;
            yearlyFlows[inv.exitYear].distribution += exitValue;
        }
    });

    // Calculate cumulative values and NAV
    let cumulativeInvested = 0;
    let cumulativeDistributed = 0;

    const results = yearlyFlows.map(yf => {
        cumulativeInvested += yf.call;
        cumulativeDistributed += yf.distribution;

        // Simple NAV calculation: Cumulative Invested - Cumulative Distributed (very basic)
        // In a real model, we'd add unrealized value growth here.
        // For now, let's just use a placeholder NAV logic or 0 if not modeled fully yet.
        // Let's assume NAV is remaining cost * unrealizedMultiple for active investments
        let currentNav = 0;
        investments.forEach(inv => {
            if (inv.entryYear <= yf.year && (inv.exitYear === 0 || inv.exitYear > yf.year)) {
                // Investment is active
                currentNav += (inv.checkSize + inv.reserves) * inv.unrealizedMultiple;
            }
        });

        return {
            year: yf.year,
            capitalCall: yf.call,
            distribution: yf.distribution,
            netCashFlow: yf.distribution - yf.call,
            cumulativeCall: cumulativeInvested,
            cumulativeDistribution: cumulativeDistributed,
            nav: currentNav
        };
    });

    return results;
}
