"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, Calendar, Library, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface Publication {
    id: number
    title: string
    category: string
    author: string
    date: string
    description: string
    coverImage: string
    downloadLink: string
}

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

export default function PublicationsPage() {
    const [publications, setPublications] = useState<Publication[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const res = await fetch("/api/publications")
                const data = await res.json()
                setPublications(data)
            } catch (error) {
                console.error("Failed to load publications", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPublications()
    }, [])

    return (
        <div className="min-h-screen bg-accent/30 py-24 px-4 md:px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" as const }}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-20"
                >
                    <div className="h-16 w-16 rounded-3xl bg-secondary flex items-center justify-center text-white shadow-xl mb-4">
                        <Library className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-serif">Publications & Resources</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Explore our collection of academic journals, books, and articles fostering knowledge and spiritual growth.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {publications.map((pub) => (
                            <motion.div key={pub.id} variants={item}>
                                <Card className="h-full flex flex-col border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-background overflow-hidden group">
                                    <div className="aspect-[3/4] overflow-hidden relative bg-muted">
                                        <img
                                            src={pub.coverImage}
                                            alt={pub.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-lg tracking-widest uppercase">
                                                {pub.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center text-xs font-medium mb-2 opacity-90">
                                                <Calendar className="h-3 w-3 mr-1.5 text-secondary" />
                                                <span>{new Date(pub.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CardHeader className="p-8 pb-4">
                                        <h3 className="font-bold text-2xl text-primary font-serif leading-tight line-clamp-2 group-hover:text-secondary transition-colors">
                                            {pub.title}
                                        </h3>
                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mt-2">
                                            By {pub.author}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-4 flex-grow">
                                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                                            {pub.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-8 pt-0">
                                        <div className="w-full flex gap-3">
                                            <Button className="flex-1 rounded-xl h-12 bg-primary text-white hover:bg-primary/90 shadow-lg font-bold" asChild>
                                                <Link href={pub.downloadLink}>
                                                    Read Online <BookOpen className="h-4 w-4 ml-2" />
                                                </Link>
                                            </Button>
                                            <Button variant="outline" className="rounded-xl h-12 w-12 p-0 border-2 border-primary/10 text-primary hover:bg-primary/5 hover:border-primary">
                                                <Download className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    )
}
