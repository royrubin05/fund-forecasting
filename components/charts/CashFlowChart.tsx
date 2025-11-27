"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CashFlowPoint } from '@/lib/types';

interface CashFlowChartProps {
    data: CashFlowPoint[]
}

export function CashFlowChart({ data }: CashFlowChartProps) {
    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `$${value / 1000000}M`}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                    />
                    <Legend iconType="circle" />
                    <Area
                        type="monotone"
                        dataKey="cumulativeCall"
                        name="Cumulative Invested"
                        stackId="1"
                        stroke="#2563EB"
                        fill="#3B82F6"
                        fillOpacity={0.1}
                    />
                    <Area
                        type="monotone"
                        dataKey="cumulativeDistribution"
                        name="Cumulative Distributed"
                        stackId="2"
                        stroke="#059669"
                        fill="#10B981"
                        fillOpacity={0.1}
                    />
                    <Area
                        type="monotone"
                        dataKey="nav"
                        name="Net Asset Value"
                        stackId="3"
                        stroke="#7C3AED"
                        fill="#8B5CF6"
                        fillOpacity={0.1}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
