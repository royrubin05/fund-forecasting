"use client"

import React, { useState, useEffect } from 'react';
import { Save, FolderOpen, RotateCcw, Trash2 } from 'lucide-react';
import { FundAssumptions } from '@/lib/types';

interface ScenarioManagerProps {
    currentAssumptions: FundAssumptions;
    onLoadScenario: (assumptions: FundAssumptions) => void;
}

interface SavedScenario {
    id: string;
    name: string;
    date: string;
    assumptions: FundAssumptions;
}

export function ScenarioManager({ currentAssumptions, onLoadScenario }: ScenarioManagerProps) {
    const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
    const [newScenarioName, setNewScenarioName] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('fundScenarios');
        if (saved) {
            setScenarios(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage whenever scenarios change
    useEffect(() => {
        localStorage.setItem('fundScenarios', JSON.stringify(scenarios));
    }, [scenarios]);

    const handleSave = () => {
        if (!newScenarioName.trim()) return;

        const newScenario: SavedScenario = {
            id: Math.random().toString(36).substr(2, 9),
            name: newScenarioName,
            date: new Date().toLocaleDateString(),
            assumptions: currentAssumptions
        };

        setScenarios([...scenarios, newScenario]);
        setNewScenarioName('');
    };

    const handleDelete = (id: string) => {
        setScenarios(scenarios.filter(s => s.id !== id));
    };

    const handleLoad = (scenario: SavedScenario) => {
        onLoadScenario(scenario.assumptions);
        setIsOpen(false);
    };

    const handleReset = () => {
        onLoadScenario({
            fundSize: 50000000,
            managementFee: 2.0,
            recyclingCap: 10,
            carry: 20,
            formationCosts: 50000,
            annualExpenses: 100000
        });
    };

    return (
        <div className="rounded-lg border bg-card p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-carta-text">Scenarios</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleReset}
                        className="p-2 text-carta-subtext hover:text-carta-text hover:bg-slate-100 rounded-md transition-colors"
                        title="Reset to Defaults"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Save New Scenario */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Scenario Name..."
                    value={newScenarioName}
                    onChange={(e) => setNewScenarioName(e.target.value)}
                    className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <button
                    onClick={handleSave}
                    disabled={!newScenarioName.trim()}
                    className="inline-flex items-center justify-center rounded-md bg-carta-blue px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                </button>
            </div>

            {/* Saved Scenarios List */}
            <div className="space-y-2">
                <p className="text-xs font-medium text-carta-subtext uppercase tracking-wider">Saved Scenarios</p>
                {scenarios.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">No saved scenarios.</p>
                ) : (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                        {scenarios.map(scenario => (
                            <div key={scenario.id} className="flex items-center justify-between group rounded-md border border-transparent hover:border-slate-200 hover:bg-slate-50 p-2 transition-all">
                                <div className="flex-1 cursor-pointer" onClick={() => handleLoad(scenario)}>
                                    <div className="font-medium text-sm text-carta-text">{scenario.name}</div>
                                    <div className="text-xs text-carta-subtext">{scenario.date}</div>
                                </div>
                                <button
                                    onClick={() => handleDelete(scenario.id)}
                                    className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
