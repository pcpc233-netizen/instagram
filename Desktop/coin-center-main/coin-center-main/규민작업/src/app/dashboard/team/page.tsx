import { Mail, Phone, MoreVertical, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const members = [
    {
        id: 1,
        name: "김철수",
        role: "Team Lead",
        department: "재무팀",
        email: "chulsoo.kim@fieldnine.io",
        phone: "010-1234-5678",
        status: "online",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    },
    {
        id: 2,
        name: "이영희",
        role: "HR Manager",
        department: "인사팀",
        email: "younghee.lee@fieldnine.io",
        phone: "010-2345-6789",
        status: "offline",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
    },
    {
        id: 3,
        name: "박지민",
        role: "Senior Designer",
        department: "디자인팀",
        email: "jimin.park@fieldnine.io",
        phone: "010-3456-7890",
        status: "online",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jude"
    },
    {
        id: 4,
        name: "최준호",
        role: "Lead Developer",
        department: "개발팀",
        email: "junho.choi@fieldnine.io",
        phone: "010-4567-8901",
        status: "busy",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam"
    },
    {
        id: 5,
        name: "정수진",
        role: "Marketing Specialist",
        department: "마케팅팀",
        email: "sujin.jung@fieldnine.io",
        phone: "010-5678-9012",
        status: "online",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    }
]

export default function TeamPage() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">팀 관리</h1>
                    <p className="text-slate-400">조직 구성원과 권한을 관리합니다.</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Shield className="mr-2 h-4 w-4" /> 권한 설정
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="relative rounded-xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur hover:border-purple-500/30 transition-all">
                        <div className="absolute top-6 right-6">
                            <button className="text-slate-500 hover:text-white">
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="relative mb-4">
                                <div className="h-20 w-20 rounded-full bg-slate-800 overflow-hidden border-2 border-slate-700">
                                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                </div>
                                <div className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-4 border-slate-900 ${member.status === 'online' ? 'bg-emerald-500' :
                                        member.status === 'busy' ? 'bg-red-500' :
                                            'bg-slate-500'
                                    }`} />
                            </div>
                            <h3 className="text-lg font-bold text-white">{member.name}</h3>
                            <p className="text-sm text-purple-400 font-medium mb-1">{member.role}</p>
                            <p className="text-xs text-slate-500">{member.department}</p>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-slate-800">
                            <div className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span className="truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span>{member.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
