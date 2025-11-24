'use client';

import { Bell, Search, Menu } from 'lucide-react';

export function DashboardHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/50 px-6 backdrop-blur">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-slate-400 hover:text-white">
                    <Menu className="h-6 w-6" />
                </button>
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="검색..."
                        className="h-9 w-64 rounded-full border border-slate-800 bg-slate-900/50 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                </button>
            </div>
        </header>
    );
}
