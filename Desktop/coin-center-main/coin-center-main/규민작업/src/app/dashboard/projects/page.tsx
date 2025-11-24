import { Plus, MoreHorizontal, Calendar, Users, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
    {
        id: 1,
        title: "2024 브랜드 리브랜딩",
        description: "전사적 브랜드 아이덴티티 재정립 및 가이드라인 배포",
        status: "진행중",
        progress: 65,
        dueDate: "2024.04.15",
        members: 4,
        tags: ["Design", "Branding"]
    },
    {
        id: 2,
        title: "글로벌 마켓 확장 전략",
        description: "북미/유럽 시장 진출을 위한 시장 조사 및 전략 수립",
        status: "계획",
        progress: 15,
        dueDate: "2024.05.01",
        members: 6,
        tags: ["Strategy", "Global"]
    },
    {
        id: 3,
        title: "사내 인트라넷 고도화",
        description: "임직원 업무 효율 증대를 위한 그룹웨어 기능 개선",
        status: "검토",
        progress: 90,
        dueDate: "2024.03.30",
        members: 3,
        tags: ["Dev", "Internal"]
    },
    {
        id: 4,
        title: "Q2 신제품 런칭 이벤트",
        description: "신제품 출시 기념 온/오프라인 통합 마케팅 캠페인",
        status: "진행중",
        progress: 40,
        dueDate: "2024.04.10",
        members: 8,
        tags: ["Marketing", "Event"]
    },
    {
        id: 5,
        title: "고객 데이터 플랫폼(CDP) 구축",
        description: "고객 행동 데이터 통합 분석 시스템 개발",
        status: "계획",
        progress: 0,
        dueDate: "2024.06.30",
        members: 5,
        tags: ["Data", "Dev"]
    },
    {
        id: 6,
        title: "ESG 경영 보고서 발간",
        description: "2023년도 지속가능경영 성과 정리 및 보고서 디자인",
        status: "완료",
        progress: 100,
        dueDate: "2024.03.15",
        members: 2,
        tags: ["ESG", "Report"]
    }
]

export default function ProjectsPage() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">프로젝트</h1>
                    <p className="text-slate-400">진행 중인 주요 프로젝트를 관리합니다.</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> 새 프로젝트
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all backdrop-blur">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-400 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                            {project.description}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className={`flex items-center gap-1.5 font-medium ${project.status === '완료' ? 'text-emerald-500' :
                                        project.status === '진행중' ? 'text-blue-500' :
                                            'text-slate-500'
                                    }`}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    {project.status}
                                </span>
                                <span className="text-slate-400">{project.progress}%</span>
                            </div>

                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${project.status === '완료' ? 'bg-emerald-500' :
                                            project.status === '진행중' ? 'bg-blue-500' :
                                                'bg-slate-600'
                                        }`}
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {project.dueDate}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5" />
                                    {project.members}명 참여
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
