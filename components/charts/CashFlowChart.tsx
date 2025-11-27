"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CashFlowChartProps {
    data: CashFlowPoint[]
}

export function CashFlowChart({ data }: CashFlowChartProps) {
                    />
                </AreaChart >
            </ResponsiveContainer >
        </div >
    );
}
