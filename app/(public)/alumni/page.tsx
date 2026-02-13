"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Quote, GraduationCap, Users, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface Alumni {
    id: number
    name: string
    year: string
    position: string
    visible: boolean
    image?: string
    message?: string
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
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
}

export default function AlumniPage() {
    const [alumniList, setAlumniList] = useState<Alumni[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const res = await fetch("/api/alumni")
                const data = await res.json()
                // Filter only visible alumni
                const visibleAlumni = data.filter((a: Alumni) => a.visible)
                setAlumniList(visibleAlumni)
            } catch (error) {
                console.error("Failed to fetch alumni", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAlumni()
    }, [])

    return (
        <div className="min-h-screen bg-accent/30 py-24 px-4 md:px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-20"
                >
                    <div className="h-16 w-16 rounded-3xl bg-secondary flex items-center justify-center text-white shadow-xl mb-4">
                        <Users className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-serif">Our Notable Alumni</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Celebrating the achievements and impact of those who have passed through our halls.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {alumniList.length === 0 ? (
                            <div className="col-span-full text-center text-muted-foreground">No alumni profiles to display yet.</div>
                        ) : (
                            alumniList.map((alumnus) => (
                                <motion.div key={alumnus.id} variants={item}>
                                    <Card className="text-center rounded-[3rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-background overflow-hidden relative group h-full">
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <CardHeader className="flex flex-col items-center pt-12">
                                            <div className="h-28 w-28 rounded-[2rem] bg-muted overflow-hidden mb-6 relative group-hover:rotate-3 transition-transform duration-500 shadow-lg flex items-center justify-center text-4xl font-serif text-muted-foreground font-bold">
                                                {alumnus.image ? (
                                                    <img
                                                        src={alumnus.image}
                                                        alt={alumnus.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span>{alumnus.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-2xl text-primary font-serif">{alumnus.name}</h3>
                                            <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.2em] mt-2">
                                                <GraduationCap className="h-4 w-4" />
                                                CLASS OF {alumnus.year}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 font-medium">{alumnus.position}</p>
                                        </CardHeader>
                                        <CardContent className="p-8 pt-0">
                                            <div className="relative pt-6">
                                                <Quote className="h-10 w-10 text-primary/5 absolute -top-4 left-1/2 -translate-x-1/2" />
                                                <p className="text-lg text-muted-foreground italic leading-relaxed relative z-10">
                                                    "{alumnus.message || "Proud styling of Subulussunna."}"
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    )
}
