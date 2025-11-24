"use client"

import { MoreHorizontal, Plus, MessageSquare, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"

type BoardColumn = {
    id: string
    title: string
    cards: BoardCard[]
}

type BoardCard = {
    id: string
    title: string
    image?: string
    tags: string[]
    assignee: string
    comments: number
    attachments: number
}

interface KanbanBoardProps {
    data: BoardColumn[]
}

export function KanbanBoard({ data }: KanbanBoardProps) {
    return (
        <div className="flex h-full gap-6 overflow-x-auto pb-4">
            {data.map((column) => (
                <div key={column.id} className="w-80 flex-shrink-0 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-300 flex items-center gap-2">
                            {column.title}
                            <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">
                                {column.cards.length}
                            </span>
                        </h3>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {column.cards.map((card) => (
                            <div key={card.id} className="group bg-slate-900/50 border border-slate-800 rounded-xl p-3 hover:border-purple-500/50 transition-all cursor-pointer">
                                {card.image && (
                                    <div className="mb-3 rounded-lg overflow-hidden aspect-video bg-slate-950 relative">
                                        <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}

                                <div className="flex gap-2 mb-2">
                                    {card.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h4 className="text-sm font-medium text-slate-200 mb-3 group-hover:text-purple-300 transition-colors">
                                    {card.title}
                                </h4>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        {card.comments > 0 && (
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="h-3 w-3" /> {card.comments}
                                            </div>
                                        )}
                                        {card.attachments > 0 && (
                                            <div className="flex items-center gap-1">
                                                <Paperclip className="h-3 w-3" /> {card.attachments}
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                                        {card.assignee.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full border border-dashed border-slate-800 text-slate-500 hover:bg-slate-900 hover:text-slate-300 h-10">
                            <Plus className="mr-2 h-4 w-4" /> 카드 추가
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
