"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

export default function AddNewsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        alert("News added successfully!")
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/news">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight text-primary font-serif">Add News</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>News Details</CardTitle>
                    <CardDescription>Create a new announcement or event post.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">Title</label>
                            <Input id="title" placeholder="Enter news title" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-medium">Category</label>
                                <select
                                    id="category"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option>General</option>
                                    <option>Events</option>
                                    <option>Admissions</option>
                                    <option>Exam Results</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="date" className="text-sm font-medium">Publish Date</label>
                                <Input id="date" type="date" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium">Featured Image</label>
                            <Input id="image" type="file" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">Content</label>
                            <textarea
                                id="content"
                                className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Write article content here..."
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="publish" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                            <label htmlFor="publish" className="text-sm font-medium">Publish immediately</label>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/news">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                "Saving..."
                            ) : (
                                <><Save className="mr-2 h-4 w-4" /> Save News</>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
