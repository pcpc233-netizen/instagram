import { KanbanBoard } from "@/components/dashboard/views/kanban-board"
import { DenseGrid } from "@/components/dashboard/views/dense-grid"
import { TicketList } from "@/components/dashboard/views/ticket-list"
import { LayoutGrid, List, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock Data Generators
const getDesignData = () => [
    {
        id: "col-1",
        title: "아이디어 (Ideation)",
        cards: [
            { id: "c1", title: "24FW 다운 자켓 컨셉 스케치", tags: ["Outer", "FW24"], assignee: "Kim", comments: 3, attachments: 2, image: "https://images.unsplash.com/photo-1551488852-0801751acbe3?w=800&q=80" },
            { id: "c2", title: "봄 시즌 컬러 팔레트 선정", tags: ["Color", "Trend"], assignee: "Lee", comments: 1, attachments: 5, image: "https://images.unsplash.com/photo-1507676184212-d0370baf122a?w=800&q=80" },
        ]
    },
    {
        id: "col-2",
        title: "디자인 (Drafting)",
        cards: [
            { id: "c3", title: "메인 로고 리뉴얼 시안", tags: ["Branding"], assignee: "Park", comments: 8, attachments: 1, image: "https://images.unsplash.com/photo-1626785774573-4b79931256ce?w=800&q=80" },
        ]
    },
    {
        id: "col-3",
        title: "검토 (Review)",
        cards: [
            { id: "c4", title: "SS25 룩북 촬영 컨셉", tags: ["Photo", "SS25"], assignee: "Choi", comments: 12, attachments: 0, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" },
        ]
    },
    {
        id: "col-4",
        title: "확정 (Finalize)",
        cards: []
    }
]

const getSourcingData = () => [
    { id: "1", sku: "FAB-24-001", item: "Cotton 100% Twill", vendor: "TexCorp", cost: "$4.50/yd", qty: 5000, deadline: "2024-03-15", status: "생산중" },
    { id: "2", sku: "ACC-24-055", item: "YKK Zipper #5", vendor: "YKK Korea", cost: "$0.25/ea", qty: 10000, deadline: "2024-03-20", status: "발주대기" },
    { id: "3", sku: "FAB-24-002", item: "Nylon Ripstop", vendor: "TechFab", cost: "$5.20/yd", qty: 3000, deadline: "2024-04-01", status: "입고완료" },
    { id: "4", sku: "BTN-24-102", item: "Metal Snap Button", vendor: "Union Acc", cost: "$0.10/ea", qty: 20000, deadline: "2024-03-25", status: "생산중" },
]

const getCSData = () => [
    { id: "992", customer: "홍길동", issue: "지퍼 불량 신고 (다운자켓)", type: "불량", priority: "High", status: "Open", date: "2024-02-20 14:30" },
    { id: "991", customer: "김철수", issue: "사이즈 교환 요청 (M -> L)", type: "교환", priority: "Medium", status: "In Progress", date: "2024-02-20 13:15" },
    { id: "990", customer: "이영희", issue: "배송지 변경 문의", type: "문의", priority: "Low", status: "Resolved", date: "2024-02-20 11:00" },
    { id: "989", customer: "박지민", issue: "환불 처리 지연 문의", type: "환불", priority: "High", status: "Open", date: "2024-02-19 16:45" },
]

export default function DepartmentPage({ params }: { params: { department: string } }) {
    const dept = params.department

    // Determine View Type & Data based on Department
    let viewType = "board"
    let title = "Department"
    let description = "Workspace"
    let content = null

    if (['design', 'web-design', 'marketing'].includes(dept)) {
        viewType = "board"
        title = dept === 'design' ? '디자인실' : dept === 'web-design' ? '웹디자인' : '마케팅'
        description = "크리에이티브 프로젝트 및 에셋 관리"
        content = <KanbanBoard data={getDesignData()} />
    } else if (['sourcing', 'planning', 'offline-sales'].includes(dept)) {
        viewType = "grid"
        title = dept === 'sourcing' ? '소싱/생산' : dept === 'planning' ? '기획/MD' : '오프라인 영업'
        description = "발주, 재고, 매출 데이터 관리"
        content = <DenseGrid data={getSourcingData()} />
    } else {
        viewType = "list"
        title = dept === 'online-sales' ? '온라인 영업' : 'CS/고객지원'
        description = "고객 주문 및 문의 처리"
        content = <TicketList data={getCSData()} /> // Type assertion needed if strict
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        {title}
                        <span className="text-xs font-normal text-slate-500 px-2 py-0.5 rounded-full border border-slate-800">
                            {viewType === 'board' ? 'Kanban View' : viewType === 'grid' ? 'Data Grid' : 'List View'}
                        </span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">{description}</p>
                </div>

                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <Button variant={viewType === 'board' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-xs">
                        <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> 보드
                    </Button>
                    <Button variant={viewType === 'grid' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-xs">
                        <List className="h-3.5 w-3.5 mr-1.5" /> 리스트
                    </Button>
                    <Button variant={viewType === 'calendar' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-xs">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1.5" /> 캘린더
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden p-6">
                {content}
            </div>
        </div>
    )
}
