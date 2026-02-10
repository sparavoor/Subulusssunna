"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, EyeOff, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock Data
const initialAlumni = [
    {
        id: 1,
        name: "Dr. Ahmed Bilal",
        year: "2010",
        position: "Senior Researcher",
        visible: true
    },
    {
        id: 2,
        name: "Fatima Zahra",
        year: "2012",
        position: "Software Engineer",
        visible: true
    },
    {
        id: 3,
        name: "Usthad Kareem",
        year: "2008",
        position: "Imam & Khatib",
        visible: false
    }
]

export default function AdminAlumniPage() {
    const [alumni, setAlumni] = useState(initialAlumni)
    const [isAdding, setIsAdding] = useState(false)

    const toggleVisibility = (id: number) => {
        setAlumni(alumni.map(a => a.id === id ? { ...a, visible: !a.visible } : a))
    }

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this profile?")) {
            setAlumni(alumni.filter(a => a.id !== id))
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
                        <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input placeholder="Alumni Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Batch Year</label>
                                <Input placeholder="Example: 2015" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Current Position</label>
                                <Input placeholder="Job Title / Role" />
                            </div>
                            <div className="flex gap-2">
                                <Button className="flex-1">Save Profile</Button>
                                <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
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
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium bg-muted/50 text-sm">
                            <div className="col-span-4">Name</div>
                            <div className="col-span-2">Batch</div>
                            <div className="col-span-3">Position</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        {alumni.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm hover:bg-muted/10 transition-colors">
                                <div className="col-span-4 font-medium flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0" />
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
                                        onClick={() => toggleVisibility(item.id)}
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
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
