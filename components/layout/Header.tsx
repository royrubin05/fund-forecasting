import { Bell, User } from 'lucide-react';

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
                <button className="rounded-full p-2 hover:bg-accent text-muted-foreground">
                    <Bell className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 hover:bg-accent text-muted-foreground">
                    <User className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
