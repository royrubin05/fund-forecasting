import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: LucideIcon;
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
    return (
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="flex items-baseline space-x-2">
                <h2 className="text-2xl font-bold">{value}</h2>
                {change && (
                    <span
                        className={clsx(
                            "flex items-center text-xs font-medium",
                            trend === 'up' ? "text-green-500" : trend === 'down' ? "text-red-500" : "text-gray-500"
                        )}
                    >
                        {trend === 'up' ? <ArrowUpRight className="mr-1 h-3 w-3" /> : trend === 'down' ? <ArrowDownRight className="mr-1 h-3 w-3" /> : null}
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}
