import { AppLayout } from '@/components/layout/AppLayout';

export default function ForecastingPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-carta-text">Forecasting</h1>
                    <p className="text-carta-subtext">Detailed cash flow forecasting and scenario analysis.</p>
                </div>
                <div className="rounded-lg border border-dashed p-12 text-center">
                    <p className="text-muted-foreground">This module is under development.</p>
                </div>
            </div>
        </AppLayout>
    );
}
