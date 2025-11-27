import { Sliders, DollarSign, Percent } from 'lucide-react';

interface ScenarioControlsProps {
    fundSize: number;
    setFundSize: (value: number) => void;
    managementFee: number;
    setManagementFee: (value: number) => void;
    recyclingCap: number;
    setRecyclingCap: (value: number) => void;
    carry: number;
    setCarry: (value: number) => void;
}

export function ScenarioControls({
    fundSize,
    setFundSize,
    managementFee,
    setManagementFee,
    recyclingCap,
    setRecyclingCap,
    carry,
    setCarry,
}: ScenarioControlsProps) {
    return (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Sliders className="h-5 w-5 text-carta-blue" />
                <h3 className="font-semibold text-carta-text">Fund Assumptions</h3>
            </div>

            <div className="space-y-6">
                {/* Fund Size */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-carta-subtext">Fund Size</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="number"
                            value={fundSize}
                            onChange={(e) => setFundSize(Number(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Management Fee */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-carta-subtext">Management Fee (Annual)</label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.1"
                            value={managementFee}
                            onChange={(e) => setManagementFee(Number(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>

                {/* Recycling Cap */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-carta-subtext">Recycling Cap (% of Fund)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={recyclingCap}
                            onChange={(e) => setRecyclingCap(Number(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>

                {/* Carried Interest */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-carta-subtext">Carried Interest</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={carry}
                            onChange={(e) => setCarry(Number(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </div>
    );
}
