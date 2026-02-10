"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Quote, GraduationCap, Users } from "lucide-react"
import { motion } from "framer-motion"

const alumniList = [
    {
        id: 1,
        name: "Dr. Ahmed Bilal",
        year: "2010",
        position: "Senior Researcher, Islamic History Institute",
        image: "https://i.pravatar.cc/150?u=1",
        message: "Subulussunna gave me the foundation to pursue academic excellence while staying true to my roots."
    },
    {
        id: 2,
        name: "Fatima Zahra",
        year: "2012",
        position: "Software Engineer, Tech Corp",
        image: "https://i.pravatar.cc/150?u=2",
        message: "The discipline and values I learned here have been instrumental in my professional career."
    },
    {
        id: 3,
        name: "Usthad Kareem",
        year: "2008",
        position: "Imam & Khatib, City Grand Mosque",
        image: "https://i.pravatar.cc/150?u=3",
        message: "I am forever grateful for the spiritual guidance and knowledge imparted by my teachers."
    },
    {
        id: 4,
        name: "Yusuf Ali",
        year: "2015",
        position: "Entrepreneur",
        image: "https://i.pravatar.cc/150?u=4",
        message: "The holistic education at Subulussunna prepared me to face life's challenges with confidence."
    },
    {
        id: 5,
        name: "Aisha Siddiqua",
        year: "2018",
        position: "Medical Student",
        image: "https://i.pravatar.cc/150?u=5",
        message: "Balancing Hifz with academics seemed hard, but the support system here made it possible."
    },
    {
        id: 6,
        name: "Omar Farooq",
        year: "2019",
        position: "Journalist",
        image: "https://i.pravatar.cc/150?u=6",
        message: "A place that truly nurtures critical thinking and moral responsibility."
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
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

export default function AlumniPage() {
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

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {alumniList.map((alumnus) => (
                        <motion.div key={alumnus.id} variants={item}>
                            <Card className="text-center rounded-[3rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-background overflow-hidden relative group">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardHeader className="flex flex-col items-center pt-12">
                                    <div className="h-28 w-28 rounded-[2rem] bg-muted overflow-hidden mb-6 relative group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                                        <img
                                            src={alumnus.image}
                                            alt={alumnus.name}
                                            className="w-full h-full object-cover"
                                        />
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
                                            "{alumnus.message}"
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
