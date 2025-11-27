export interface Investment {
    id: string;
    name: string;
    sector: string;
    stage: string;
    checkSize: number;
    reserves: number;
    // New fields for granular modeling
    entryYear: number; // Year investment was made (relative to fund start)
    exitYear: number;  // Year of exit (or 0 if active)
    realizedMultiple: number; // Cash returned / Total Cost
    unrealizedMultiple: number; // Current NAV / Total Cost
}

export interface FundAssumptions {
    fundSize: number;
    managementFee: number; // Annual %
    recyclingCap: number; // % of fund size
    carry: number; // %
    formationCosts: number; // One-time $
    annualExpenses: number; // Annual $
}

export interface CashFlowPoint {
    year: number;
    capitalCall: number;
    distribution: number;
    netCashFlow: number;
    cumulativeCall: number;
    cumulativeDistribution: number;
    nav: number;
}
