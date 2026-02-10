"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Newspaper, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const newsItems = [
    {
        id: 1,
        title: "Annual Islamic Conference 2025",
        excerpt: "Join us for a day of spiritual enlightenment with renowned scholars from across the globe.",
        date: "2025-10-15",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800",
        category: "Events"
    },
    {
        id: 2,
        title: "Admissions Open for Academic Year 2026",
        excerpt: "Applications are now being accepted for Hifz and General Education programs.",
        date: "2025-09-01",
        image: "https://images.unsplash.com/photo-1523050853064-8504bad82420?auto=format&fit=crop&q=80&w=800",
        category: "Admissions"
    },
    {
        id: 3,
        title: "New Digital Library Wing Inaugurated",
        excerpt: "Our state-of-the-art library is now open to students, featuring over 10,000 digital resources.",
        date: "2025-08-20",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800",
        category: "Campus"
    },
    {
        id: 4,
        title: "Student achievements in District Arts Fest",
        excerpt: "Our students secured top positions in Quran recitation and Elocution competitions.",
        date: "2025-08-10",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
        category: "Achievements"
    }
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
}

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-accent/30 py-20 px-4 md:px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-20"
                >
                    <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl mb-4">
                        <Newspaper className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-serif">News & Announcements</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Stay connected with our evolving campus, student breakthroughs, and upcoming events.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {newsItems.map((news) => (
                        <motion.div key={news.id} variants={item}>
                            <Card className="overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-background group h-full flex flex-col">
                                <Link href={`/news/${news.id}`} className="aspect-[4/3] overflow-hidden relative block">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm tracking-widest uppercase">
                                            {news.category}
                                        </span>
                                    </div>
                                </Link>
                                <CardHeader className="p-8 pb-4">
                                    <div className="flex items-center text-xs text-muted-foreground mb-4 font-bold tracking-widest uppercase">
                                        <Calendar className="h-3 w-3 mr-2 text-secondary" />
                                        <span>{new Date(news.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <CardTitle className="text-2xl font-serif line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                        <Link href={`/news/${news.id}`}>{news.title}</Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-8 flex-grow">
                                    <p className="text-muted-foreground text-lg line-clamp-3 leading-relaxed">
                                        {news.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-8 pt-4">
                                    <Button variant="ghost" className="w-full justify-between h-14 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all text-lg font-bold" asChild>
                                        <Link href={`/news/${news.id}`}>
                                            Read Full Story <ChevronRight className="h-5 w-5 ml-2" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
