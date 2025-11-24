"use client"

import { AlertCircle, CheckCircle2, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Ticket = {
    id: string
    customer: string
    issue: string
    type: "환불" | "교환" | "불량" | "문의"
    priority: "High" | "Medium" | "Low"
    status: "Open" | "In Progress" | "Resolved"
    date: string
}

interface TicketListProps {
    data: Ticket[]
}

export function TicketList({ data }: TicketListProps) {
    return (
        <div className="space-y-2">
            {data.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${ticket.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                                ticket.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                    'bg-slate-500/10 text-slate-500'
                            }`}>
                            <AlertCircle className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs text-slate-500">#{ticket.id}</span>
                                <h4 className="font-medium text-slate-200">{ticket.issue}</h4>
                                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-400 border border-slate-700">
                                    {ticket.type}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span>{ticket.customer}</span>
                                <span>•</span>
                                <span>{ticket.date}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className={`flex items-center gap-1.5 text-sm font-medium ${ticket.status === 'Resolved' ? 'text-emerald-500' :
                                ticket.status === 'In Progress' ? 'text-blue-500' :
                                    'text-slate-400'
                            }`}>
                            {ticket.status === 'Resolved' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                            {ticket.status}
                        </div>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
