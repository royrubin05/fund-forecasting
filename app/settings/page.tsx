import { AppLayout } from '@/components/layout/AppLayout';

export default function SettingsPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-carta-text">Settings</h1>
                    <p className="text-carta-subtext">Manage your account and application preferences.</p>
                </div>
                <div className="rounded-lg border border-dashed p-12 text-center">
                    <p className="text-muted-foreground">This module is under development.</p>
                </div>
            </div>
        </AppLayout>
    );
}
