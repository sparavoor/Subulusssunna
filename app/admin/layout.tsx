import Link from "next/link"
import {
    CreditCard,
    LayoutDashboard,
    Settings,
    Users,
    MessageSquare,
    FileText,
    LogOut,
    GraduationCap,
    BookOpen
} from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-background md:flex">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">S</span>
                        <span className="">Subulussunna Admin</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1 mt-4">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/admissions"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <CreditCard className="h-4 w-4" />
                            Admissions
                        </Link>
                        <Link
                            href="/admin/news"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <FileText className="h-4 w-4" />
                            News & Events
                        </Link>
                        <Link
                            href="/admin/publications"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <BookOpen className="h-4 w-4" />
                            Publications
                        </Link>
                        <Link
                            href="/admin/alumni"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <GraduationCap className="h-4 w-4" />
                            Alumni
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Messages
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t">
                    <Link href="/admin/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
                    <div className="flex items-center gap-2 font-semibold">
                        <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">S</span>
                        <span>Admin Panel</span>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/10">
                    {children}
                </main>
            </div>
        </div>
    )
}
