"use client"

import { motion } from "framer-motion"
import {
    GraduationCap,
    BookOpen,
    Calendar,
    Clock,
    CheckCircle2,
    Bell,
    ChevronRight,
    Search,
    User,
    LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const }
}

const stats = [
    { label: "Attendance", value: "94%", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "GPA", value: "3.85", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Courses", value: "6 Active", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Homework", value: "2 Pending", color: "text-rose-600", bg: "bg-rose-50" },
]

export default function StudentDashboard() {
    return (
        <div className="min-h-screen bg-accent/30 pb-20">
            {/* Dashboard Header */}
            <div className="bg-primary text-primary-foreground pt-32 pb-24 rounded-b-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-6"
                        >
                            <div className="h-24 w-24 rounded-[2.5rem] bg-white text-primary flex items-center justify-center shadow-2xl ring-4 ring-white/10">
                                <User className="h-12 w-12" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl md:text-5xl font-bold font-serif">Welcome, Student</h1>
                                <p className="text-primary-foreground/70 text-lg flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    ID: SS-2025-0421 • Hifz Course
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-4"
                        >
                            <Button variant="outline" className="rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 h-12 px-6" asChild>
                                <Link href="/"><LogOut className="h-4 w-4 mr-2" /> Logout</Link>
                            </Button>
                            <Button className="rounded-2xl bg-secondary hover:bg-secondary/90 shadow-xl h-12 px-8">
                                Academic Profile
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="container mx-auto px-4 md:px-6 -mt-12 relative z-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="border-none shadow-xl rounded-3xl bg-background overflow-hidden relative group">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <span className={cn("text-3xl md:text-4xl font-bold font-serif mb-1 group-hover:scale-110 transition-transform", stat.color)}>{stat.value}</span>
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                                    <div className={cn("absolute inset-0 opacity-[0.03] pointer-events-none", stat.bg)} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mt-12">
                    {/* Main Sections */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Weekly Schedule */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                            <Card className="border-none shadow-xl rounded-[2.5rem] bg-background">
                                <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl font-serif text-primary">Class Schedule</CardTitle>
                                        <CardDescription>Upcoming lectures for today</CardDescription>
                                    </div>
                                    <Button variant="ghost" className="rounded-xl text-secondary font-bold">Today <ChevronRight className="h-4 w-4 ml-1" /></Button>
                                </CardHeader>
                                <CardContent className="p-8 pt-2 space-y-4">
                                    {[
                                        { subject: "Quran Hifz", time: "08:00 AM - 10:00 AM", instructor: "Usthad Omar", done: true },
                                        { subject: "Fiqh Basics", time: "10:30 AM - 12:00 PM", instructor: "Shaykh Ahmed", done: false },
                                        { subject: "Islamic History", time: "02:00 PM - 03:30 PM", instructor: "Dr. Bilal", done: false },
                                    ].map((item, i) => (
                                        <div key={i} className={cn(
                                            "flex items-center justify-between p-4 rounded-2xl transition-all border",
                                            item.done ? "bg-muted/50 border-muted opacity-80" : "bg-primary/5 border-primary/10 hover:bg-primary/10"
                                        )}>
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                                                    item.done ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                                                )}>
                                                    <BookOpen className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-primary">{item.subject}</h4>
                                                    <div className="flex items-center text-xs text-muted-foreground mt-1 gap-3">
                                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                                                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {item.instructor}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {item.done && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Recent Grades */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                            <Card className="border-none shadow-xl rounded-[2.5rem] bg-background">
                                <CardHeader className="p-8 pb-4">
                                    <CardTitle className="text-2xl font-serif text-primary">Recent Grades</CardTitle>
                                    <CardDescription>Your performance in recent assessments</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-2">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { test: "Weekly Hifz Review", grade: "A+", date: "Feb 10" },
                                            { test: "Arabic Grammar Quiz", grade: "A", date: "Feb 08" },
                                            { test: "Tafseer Presentation", grade: "B+", date: "Feb 05" },
                                            { test: "Hadith Memorization", grade: "A", date: "Feb 01" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors">
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-sm">{item.test}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{item.date}</p>
                                                </div>
                                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center font-bold text-primary shadow-sm border border-muted ring-2 ring-primary/5">
                                                    {item.grade}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Sidebar Sidebar */}
                    <div className="space-y-8">
                        {/* Important Notices */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
                            <Card className="border-none shadow-xl rounded-[2.5rem] bg-background overflow-hidden">
                                <CardHeader className="p-8 pb-4 bg-secondary text-white relative">
                                    <CardTitle className="text-xl font-serif flex items-center gap-2">
                                        <Bell className="h-5 w-5" /> Notifications
                                    </CardTitle>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    {[
                                        { title: "Maha-Salah Gathering", text: "Mandatory attendance for all students this Friday after Asr.", date: "Today" },
                                        { title: "Exam Schedule Posted", text: "The mid-term examination schedule for 2026 is now available.", date: "Yesterday" },
                                        { title: "New Library Hours", text: "Library will be open until 10 PM during exam weeks.", date: "3 Days ago" },
                                    ].map((note, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-muted/30 space-y-2 relative group cursor-pointer hover:bg-muted/50 transition-colors">
                                            <span className="text-[10px] uppercase font-bold text-secondary tracking-widest">{note.date}</span>
                                            <h5 className="font-bold text-primary text-sm line-clamp-1">{note.title}</h5>
                                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{note.text}</p>
                                        </div>
                                    ))}
                                    <Button variant="outline" className="w-full rounded-xl border-secondary/20 text-secondary hover:bg-secondary hover:text-white transition-all font-bold">
                                        View All Notices
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Resource Downloads */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.7 }}>
                            <Card className="border-none shadow-xl rounded-[2.5rem] bg-background">
                                <CardHeader className="p-8 pb-4">
                                    <CardTitle className="text-xl font-serif">Quick Resources</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 pt-0 space-y-3">
                                    {[
                                        "Semester Syllabus 2025-26",
                                        "Student Code of Conduct",
                                        "Library Access Form",
                                        "Leave Request Form"
                                    ].map((file, i) => (
                                        <Link key={i} href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 group transition-colors">
                                            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{file}</span>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
