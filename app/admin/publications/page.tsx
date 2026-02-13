"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, BookOpen, Download } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

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

export default function AdminPublicationsPage() {
    const [publications, setPublications] = useState<Publication[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchPublications()
    }, [])

    const fetchPublications = async () => {
        try {
            const res = await fetch("/api/publications")
            const data = await res.json()
            setPublications(data)
        } catch (error) {
            console.error("Failed to fetch publications", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this publication?")) return

        try {
            const res = await fetch(`/api/publications?id=${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                setPublications(publications.filter((pub) => pub.id !== id))
            } else {
                alert("Failed to delete publication")
            }
        } catch (error) {
            console.error("Error deleting publication:", error)
        }
    }

    if (isLoading) return <div className="p-8 text-center">Loading publications...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-primary">Publications</h1>
                    <p className="text-muted-foreground">Manage books, journals, and newsletters.</p>
                </div>
                <Button asChild className="gap-2">
                    <Link href="/admin/publications/new">
                        <Plus className="h-4 w-4" /> Add Publication
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {publications.map((pub) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="overflow-hidden h-full flex flex-col">
                            <div className="aspect-video relative bg-muted">
                                <img
                                    src={pub.coverImage}
                                    alt={pub.title}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-primary shadow-sm uppercase tracking-wide">
                                    {pub.category}
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="line-clamp-1 text-lg font-serif">{pub.title}</CardTitle>
                                <p className="text-sm text-muted-foreground font-medium">By {pub.author}</p>
                            </CardHeader>
                            <CardContent className="flex-1 pb-4">
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {pub.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="text-xs text-muted-foreground">
                                        {new Date(pub.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                            <Link href={pub.downloadLink} target="_blank">
                                                <Download className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleDelete(pub.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {publications.length === 0 && (
                <div className="text-center py-12 bg-muted/30 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-bold text-muted-foreground">No publications found</h3>
                    <p className="text-sm text-muted-foreground/70 mb-6">Get started by creating a new publication.</p>
                    <Button variant="outline" asChild>
                        <Link href="/admin/publications/new">Add First Publication</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
