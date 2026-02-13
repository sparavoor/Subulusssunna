"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NewPublicationPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "Journal",
        author: "",
        date: new Date().toISOString().split('T')[0],
        description: "",
        coverImage: "",
        downloadLink: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/publications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                router.push("/admin/publications")
                router.refresh()
            } else {
                alert("Failed to save publication")
            }
        } catch (error) {
            console.error("Error saving publication:", error)
            alert("An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/publications">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-serif text-primary">Add Publication</h1>
                    <p className="text-muted-foreground">Create a new entry for the digital library.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Publication Details</CardTitle>
                    <CardDescription>Enter the information for the new publication below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Annual Journal 2025"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="Journal">Journal</option>
                                    <option value="Book">Book</option>
                                    <option value="Article">Article</option>
                                    <option value="Newsletter">Newsletter</option>
                                    <option value="Magazine">Magazine</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Publication Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="author">Author / Organization</Label>
                            <Input
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="e.g., Research Wing"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Brief summary of the content..."
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage">Cover Image URL</Label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                                Make sure to use a valid image URL.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="downloadLink">Download/Read Link</Label>
                            <Input
                                id="downloadLink"
                                name="downloadLink"
                                value={formData.downloadLink}
                                onChange={handleChange}
                                placeholder="https://example.com/file.pdf"
                                required
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Publication
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
