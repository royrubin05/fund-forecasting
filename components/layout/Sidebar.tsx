import Link from 'next/link';
import { LayoutDashboard, PieChart, TrendingUp, BarChart3, Settings } from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Portfolio Construction', href: '/construction', icon: PieChart },
    { name: 'Forecasting', href: '/forecasting', icon: TrendingUp },
    { name: 'Insights', href: '/insights', icon: BarChart3 },
];

export function Sidebar() {
    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-16 items-center border-b px-6">
                <span className="text-lg font-bold tracking-tight">FundForecast</span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            "text-muted-foreground" // Default state
                        )}
                    >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="border-t p-4">
                <Link
                    href="/settings"
                    className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                    <Settings className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    Settings
                </Link>
            </div>
        </div>
    );
}
