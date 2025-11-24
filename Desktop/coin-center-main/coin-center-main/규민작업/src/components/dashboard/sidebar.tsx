'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Palette,
    Monitor,
    Megaphone,
    Factory,
    BarChart3,
    Store,
    ShoppingCart,
    Headset,
    Settings,
    ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const hubs = [
    {
        title: "Creative Hub",
        items: [
            { name: '디자인실', href: '/dashboard/work/design', icon: Palette },
            { name: '웹디자인', href: '/dashboard/work/web-design', icon: Monitor },
            { name: '마케팅', href: '/dashboard/work/marketing', icon: Megaphone },
        ]
    },
    {
        title: "Operations Center",
        items: [
            { name: '소싱/생산', href: '/dashboard/work/sourcing', icon: Factory },
            { name: '기획/MD', href: '/dashboard/work/planning', icon: BarChart3 },
            { name: '오프라인 영업', href: '/dashboard/work/offline-sales', icon: Store },
        ]
    },
    {
        title: "Customer & Growth",
        items: [
            { name: '온라인 영업', href: '/dashboard/work/online-sales', icon: ShoppingCart },
            { name: 'CS/고객지원', href: '/dashboard/work/cs', icon: Headset },
        ]
    }
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const [openHubs, setOpenHubs] = useState<string[]>(["Creative Hub", "Operations Center", "Customer & Growth"]);

    const toggleHub = (title: string) => {
        setOpenHubs(prev =>
            prev.includes(title) ? prev.filter(h => h !== title) : [...prev, title]
        );
    };

    return (
        <div className="flex h-full w-64 flex-col bg-slate-950 border-r border-slate-800">
            <div className="flex h-16 items-center gap-2 px-6 border-b border-slate-800">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                    <span className="text-sm font-bold text-white">F</span>
                </div>
                <span className="text-lg font-bold text-white">Fashion Suite</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-6 px-3">
                    <Link
                        href="/dashboard"
                        className={cn(
                            'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                            pathname === '/dashboard'
                                ? 'bg-purple-500/10 text-purple-400'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                        )}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        대시보드 홈
                    </Link>

                    {hubs.map((hub) => (
                        <div key={hub.title}>
                            <button
                                onClick={() => toggleHub(hub.title)}
                                className="flex items-center justify-between w-full px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors"
                            >
                                {hub.title}
                                <ChevronDown className={cn("h-3 w-3 transition-transform", openHubs.includes(hub.title) ? "" : "-rotate-90")} />
                            </button>

                            {openHubs.includes(hub.title) && (
                                <div className="space-y-1">
                                    {hub.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                                                    isActive
                                                        ? 'bg-purple-500/10 text-purple-400'
                                                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                                )}
                                            >
                                                <item.icon className={cn(
                                                    "h-4 w-4 transition-colors",
                                                    isActive ? "text-purple-400" : "text-slate-500 group-hover:text-white"
                                                )} />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            <div className="border-t border-slate-800 p-4">
                <Link
                    href="/dashboard/settings"
                    className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-all mb-2"
                >
                    <Settings className="h-4 w-4" />
                    설정
                </Link>
                <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
                    <div>
                        <p className="text-sm font-medium text-white">관리자</p>
                        <p className="text-xs text-slate-500">admin@fieldnine.io</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
