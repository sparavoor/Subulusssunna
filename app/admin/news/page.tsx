import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"

// Mock Data
const newsList = [
    {
        id: 1,
        title: "Annual Islamic Conference 2025",
        date: "2025-10-15",
        status: "Published",
        category: "Events"
    },
    {
        id: 2,
        title: "Admissions Open for Academic Year 2026",
        date: "2025-09-01",
        status: "Published",
        category: "Admissions"
    },
    {
        id: 3,
        title: "New Library Wing Inaugurated",
        date: "2025-08-20",
        status: "Draft",
        category: "Campus"
    }
]

export default function AdminNewsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">News Management</h1>
                <Button asChild>
                    <Link href="/admin/news/new">
                        <Plus className="mr-2 h-4 w-4" /> Add News
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All News & Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium bg-muted/50 text-sm">
                            <div className="col-span-6">Title</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        {newsList.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm hover:bg-muted/10 transition-colors">
                                <div className="col-span-6 font-medium">{item.title}</div>
                                <div className="col-span-2 text-muted-foreground">{item.date}</div>
                                <div className="col-span-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="col-span-2 flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
