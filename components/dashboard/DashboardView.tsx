"use client"

import React, { useState, useMemo } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { StatCard } from './StatCard';
import { ScenarioControls } from '../portfolio/ScenarioControls';
import { ScenarioManager } from '../portfolio/ScenarioManager';
import { InvestmentGrid } from '../portfolio/InvestmentGrid';
import { CashFlowChart } from '../charts/CashFlowChart';
import { CashFlowTable } from '../forecasting/CashFlowTable';
import { Tabs } from '../ui/Tabs';
import { calculateTVPI, calculateDPI, calculateIRR, generateProjections } from '@/lib/forecasting/calculations';
import { Investment, FundAssumptions } from '@/lib/types';

export default function DashboardView() {
  // Global Fund Assumptions
  const [assumptions, setAssumptions] = useState<FundAssumptions>({
    fundSize: 50000000,
    managementFee: 2.0,
    recyclingCap: 10,
    carry: 20,
    formationCosts: 50000,
    annualExpenses: 100000
  });

  // Portfolio Data
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Acme Corp',
      sector: 'SaaS',
      stage: 'Seed',
      checkSize: 2000000,
      reserves: 1000000,
      entryYear: 1,
      exitYear: 0,
      realizedMultiple: 0,
      unrealizedMultiple: 2.5
    },
    {
      id: '2',
      name: 'Beta Tech',
      sector: 'Fintech',
      stage: 'Series A',
      checkSize: 5000000,
      reserves: 2000000,
      entryYear: 2,
      exitYear: 5,
      realizedMultiple: 3.0,
      unrealizedMultiple: 0
    },
  ]);

  // Calculations
  const projections = useMemo(() => {
    return generateProjections(investments, assumptions);
  }, [investments, assumptions]);

  const metrics = useMemo(() => {
    const lastPoint = projections[projections.length - 1];
    const totalPaidIn = lastPoint.cumulativeCall;
    const totalDistributed = lastPoint.cumulativeDistribution;
    const currentNav = lastPoint.nav;

    const tvpi = calculateTVPI(totalPaidIn, totalDistributed, currentNav);
    const dpi = calculateDPI(totalPaidIn, totalDistributed);

    // IRR Calculation input
    const cashFlows = projections.map(p => ({
      year: p.year,
      amount: p.distribution - p.capitalCall // Net Cash Flow
    }));
    // Add final NAV as a "deemed distribution" for IRR calculation?
    // Standard practice for "Net IRR" usually implies realized cash flows,
    // but "Gross IRR" or "Projected IRR" includes NAV.
    // Let's add NAV to the final year cash flow for the IRR calculation.
    if (cashFlows.length > 0) {
      cashFlows[cashFlows.length - 1].amount += currentNav;
    }

    const irr = calculateIRR(cashFlows);

    return { tvpi, dpi, irr, totalPaidIn };
  }, [projections]);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-carta-text">Fund I Forecast</h1>
          <p className="text-carta-subtext">Q3 2024 • Base Case Scenario</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Projected TVPI"
            value={`${metrics.tvpi.toFixed(2)}x`}
            trend="+0.15x"
            trendUp={true}
          />
          <StatCard
            title="Projected DPI"
            value={`${metrics.dpi.toFixed(2)}x`}
            trend="+0.05x"
            trendUp={true}
          />
          <StatCard
            title="Projected IRR"
            value={`${metrics.irr.toFixed(1)}%`}
            trend="+2.4%"
            trendUp={true}
          />
          <StatCard
            title="Capital Called"
            value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: "compact" }).format(metrics.totalPaidIn)}
            trend={`${((metrics.totalPaidIn / assumptions.fundSize) * 100).toFixed(0)}% of Fund`}
            trendUp={true} // Neutral
          />
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column: Visualization & Data (Takes up 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs
              tabs={[
                {
                  id: 'overview',
                  label: 'Overview',
                  content: (
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 text-carta-text">Cash Flow J-Curve</h3>
                      <div className="h-[400px] w-full">
                        <CashFlowChart data={projections} />
                      </div>
                    </div>
                  )
                },
                {
                  id: 'cashflows',
                  label: 'Cash Flows',
                  content: <CashFlowTable data={projections} />
                },
                {
                  id: 'portfolio',
                  label: 'Portfolio',
                  content: <InvestmentGrid data={investments} setData={setInvestments} />
                }
              ]}
            />
          </div>

          {/* Right Column: Controls (Takes up 1/3) */}
          <div className="space-y-6">
            <ScenarioManager
              currentAssumptions={assumptions}
              onLoadScenario={setAssumptions}
            />
            <ScenarioControls
              fundSize={assumptions.fundSize}
              setFundSize={(v) => setAssumptions({ ...assumptions, fundSize: v })}
              managementFee={assumptions.managementFee}
              setManagementFee={(v) => setAssumptions({ ...assumptions, managementFee: v })}
              recyclingCap={assumptions.recyclingCap}
              setRecyclingCap={(v) => setAssumptions({ ...assumptions, recyclingCap: v })}
              carry={assumptions.carry}
              setCarry={(v) => setAssumptions({ ...assumptions, carry: v })}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
