"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, EyeOff, Eye, Loader2, Save } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Alumni {
    id: number
    name: string
    year: string
    position: string
    visible: boolean
}

export default function AdminAlumniPage() {
    const [alumni, setAlumni] = useState<Alumni[]>([])
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    // New Alumni Form State
    const [newAlumni, setNewAlumni] = useState({
        name: "",
        year: "",
        position: ""
    })

    useEffect(() => {
        fetchAlumni()
    }, [])

    const fetchAlumni = async () => {
        try {
            const res = await fetch("/api/alumni")
            const data = await res.json()
            setAlumni(data)
        } catch (error) {
            console.error("Failed to fetch alumni", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddAlumni = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            const res = await fetch("/api/alumni", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAlumni)
            })

            if (res.ok) {
                const added = await res.json()
                setAlumni([added, ...alumni])
                setIsAdding(false)
                setNewAlumni({ name: "", year: "", position: "" })
            }
        } catch (error) {
            console.error("Failed to add alumni", error)
        } finally {
            setIsSaving(false)
        }
    }

    const toggleVisibility = async (id: number, currentVisible: boolean) => {
        // Optimistic update
        setAlumni(alumni.map(a => a.id === id ? { ...a, visible: !a.visible } : a))

        try {
            await fetch("/api/alumni", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, visible: !currentVisible })
            })
        } catch (error) {
            console.error("Failed to toggle visibility", error)
            // Revert on error
            setAlumni(alumni.map(a => a.id === id ? { ...a, visible: currentVisible } : a))
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this profile?")) return

        try {
            const res = await fetch(`/api/alumni?id=${id}`, { method: "DELETE" })
            if (res.ok) {
                setAlumni(alumni.filter(a => a.id !== id))
            }
        } catch (error) {
            console.error("Failed to delete", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Alumni Management</h1>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Alumni
                </Button>
            </div>

            {isAdding && (
                <Card className="mb-6 border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="text-lg">Add New Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddAlumni} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    placeholder="Alumni Name"
                                    value={newAlumni.name}
                                    onChange={(e) => setNewAlumni({ ...newAlumni, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Batch Year</label>
                                <Input
                                    placeholder="Example: 2015"
                                    value={newAlumni.year}
                                    onChange={(e) => setNewAlumni({ ...newAlumni, year: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Current Position</label>
                                <Input
                                    placeholder="Job Title / Role"
                                    value={newAlumni.position}
                                    onChange={(e) => setNewAlumni({ ...newAlumni, position: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button className="flex-1" type="submit" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Profile"}
                                </Button>
                                <Button variant="ghost" type="button" onClick={() => setIsAdding(false)}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Alumni Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium bg-muted/50 text-sm">
                                <div className="col-span-4">Name</div>
                                <div className="col-span-2">Batch</div>
                                <div className="col-span-3">Position</div>
                                <div className="col-span-1">Status</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>
                            {alumni.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">No alumni profiles found.</div>
                            ) : (
                                alumni.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm hover:bg-muted/10 transition-colors">
                                        <div className="col-span-4 font-medium flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                {item.name.charAt(0)}
                                            </div>
                                            {item.name}
                                        </div>
                                        <div className="col-span-2 text-muted-foreground">{item.year}</div>
                                        <div className="col-span-3 text-muted-foreground">{item.position}</div>
                                        <div className="col-span-1">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {item.visible ? 'Visible' : 'Hidden'}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                                onClick={() => toggleVisibility(item.id, item.visible)}
                                                title={item.visible ? "Hide Profile" : "Show Profile"}
                                            >
                                                {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
