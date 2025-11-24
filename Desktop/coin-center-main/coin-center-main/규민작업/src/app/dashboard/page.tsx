export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">대시보드</h1>
                <div className="flex gap-2">
                    <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition">
                        + 새 프로젝트
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-4">
                {[
                    { label: '전체 프로젝트', value: '12', change: '+2.5%', trend: 'up' },
                    { label: '진행중인 업무', value: '24', change: '-4.1%', trend: 'down' },
                    { label: '팀원', value: '8', change: '+0%', trend: 'neutral' },
                    { label: '완료율', value: '94.2%', change: '+12.5%', trend: 'up' },
                ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                        <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">{stat.value}</span>
                            <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' :
                                stat.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Projects */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                    <h3 className="mb-4 text-lg font-semibold text-white">최근 프로젝트</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-4 hover:border-purple-500/50 transition">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-lg">
                                        🚀
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">프로젝트 알파 {i}</h4>
                                        <p className="text-xs text-slate-400">2시간 전 업데이트</p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                                    진행중
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                    <h3 className="mb-4 text-lg font-semibold text-white">대기중인 업무</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3 rounded-lg p-2 hover:bg-slate-800/50 transition">
                                <div className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                                <div>
                                    <p className="text-sm font-medium text-slate-200">3분기 재무 보고서 검토</p>
                                    <p className="text-xs text-slate-500">김철수 팀장에게 할당됨</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
