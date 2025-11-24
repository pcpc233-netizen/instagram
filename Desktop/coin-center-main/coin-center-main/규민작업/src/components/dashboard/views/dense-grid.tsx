"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export type GridRow = {
    id: string
    sku: string
    item: string
    vendor: string
    cost: string
    qty: number
    deadline: string
    status: string
}

interface DenseGridProps {
    data: GridRow[]
}

export function DenseGrid({ data }: DenseGridProps) {
    return (
        <div className="rounded-md border border-slate-800 bg-slate-900/40 backdrop-blur overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-950">
                    <TableRow className="border-slate-800 hover:bg-slate-900/50">
                        <TableHead className="w-[100px] text-slate-400">SKU</TableHead>
                        <TableHead className="text-slate-400">품목명</TableHead>
                        <TableHead className="text-slate-400">공급사</TableHead>
                        <TableHead className="text-right text-slate-400">단가</TableHead>
                        <TableHead className="text-right text-slate-400">수량</TableHead>
                        <TableHead className="text-slate-400">납기일</TableHead>
                        <TableHead className="text-slate-400">상태</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id} className="border-slate-800 hover:bg-slate-900/50 h-10">
                            <TableCell className="font-mono text-xs text-slate-500">{row.sku}</TableCell>
                            <TableCell className="font-medium text-slate-200">{row.item}</TableCell>
                            <TableCell className="text-slate-400">{row.vendor}</TableCell>
                            <TableCell className="text-right font-mono text-slate-300">{row.cost}</TableCell>
                            <TableCell className="text-right font-mono text-slate-300">{row.qty.toLocaleString()}</TableCell>
                            <TableCell className="text-slate-400 text-xs">{row.deadline}</TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${row.status === '입고완료' ? 'bg-emerald-500/10 text-emerald-500' :
                                        row.status === '생산중' ? 'bg-blue-500/10 text-blue-500' :
                                            row.status === '발주대기' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-slate-500/10 text-slate-500'
                                    }`}>
                                    {row.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
