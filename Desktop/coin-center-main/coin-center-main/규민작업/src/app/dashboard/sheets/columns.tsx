"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type WorkItem = {
    id: string
    title: string
    status: "대기중" | "진행중" | "완료" | "반려"
    priority: "높음" | "중간" | "낮음"
    assignee: string
    department: string
    dueDate: string
}

export const columns: ColumnDef<WorkItem>[] = [
    {
        accessorKey: "status",
        header: "상태",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            let colorClass = "text-slate-500"
            if (status === "완료") colorClass = "text-emerald-500"
            if (status === "진행중") colorClass = "text-blue-500"
            if (status === "대기중") colorClass = "text-amber-500"
            if (status === "반려") colorClass = "text-red-500"

            return (
                <div className={`font-medium ${colorClass}`}>
                    {status}
                </div>
            )
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    업무명
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "priority",
        header: "우선순위",
        cell: ({ row }) => {
            const priority = row.getValue("priority") as string
            return (
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priority === '높음' ? 'bg-red-500/10 text-red-500' :
                        priority === '중간' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-slate-500/10 text-slate-500'
                    }`}>
                    {priority}
                </div>
            )
        },
    },
    {
        accessorKey: "assignee",
        header: "담당자",
    },
    {
        accessorKey: "department",
        header: "부서",
    },
    {
        accessorKey: "dueDate",
        header: "마감일",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">메뉴 열기</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                        <DropdownMenuLabel>작업</DropdownMenuLabel>
                        <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" /> 수정
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-800" />
                        <DropdownMenuItem className="text-red-400 hover:bg-red-950/30 focus:bg-red-950/30 cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" /> 삭제
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
