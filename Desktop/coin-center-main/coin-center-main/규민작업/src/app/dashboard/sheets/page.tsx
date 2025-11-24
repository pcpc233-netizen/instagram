import { WorkItem, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<WorkItem[]> {
    return [
        {
            id: "TASK-001",
            title: "3분기 재무 보고서 검토",
            status: "진행중",
            priority: "높음",
            assignee: "김철수",
            department: "재무팀",
            dueDate: "2024-03-25",
        },
        {
            id: "TASK-002",
            title: "신규 채용 공고 등록",
            status: "완료",
            priority: "중간",
            assignee: "이영희",
            department: "인사팀",
            dueDate: "2024-03-20",
        },
        {
            id: "TASK-003",
            title: "웹사이트 메인 배너 디자인",
            status: "대기중",
            priority: "높음",
            assignee: "박지민",
            department: "디자인팀",
            dueDate: "2024-03-28",
        },
        {
            id: "TASK-004",
            title: "서버 보안 패치 적용",
            status: "진행중",
            priority: "높음",
            assignee: "최준호",
            department: "개발팀",
            dueDate: "2024-03-24",
        },
        {
            id: "TASK-005",
            title: "4월 마케팅 기획안 작성",
            status: "반려",
            priority: "중간",
            assignee: "정수진",
            department: "마케팅팀",
            dueDate: "2024-03-22",
        },
        {
            id: "TASK-006",
            title: "고객 만족도 조사 결과 분석",
            status: "완료",
            priority: "낮음",
            assignee: "강민우",
            department: "CS팀",
            dueDate: "2024-03-15",
        },
        {
            id: "TASK-007",
            title: "사내 워크샵 장소 섭외",
            status: "대기중",
            priority: "낮음",
            assignee: "이영희",
            department: "인사팀",
            dueDate: "2024-04-05",
        },
        {
            id: "TASK-008",
            title: "모바일 앱 버그 수정 (v2.1)",
            status: "진행중",
            priority: "높음",
            assignee: "최준호",
            department: "개발팀",
            dueDate: "2024-03-26",
        },
    ]
}

export default async function SheetsPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">워크시트</h1>
                    <p className="text-slate-400">전사 업무 현황을 실시간으로 관리하세요.</p>
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
