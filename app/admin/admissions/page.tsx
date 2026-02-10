"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react"

export default function AdminAdmissionsPage() {
    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchAdmissions = async () => {
        try {
            const response = await fetch("/api/admissions")
            const data = await response.json()
            setApplications(data)
        } catch (error) {
            console.error("Error fetching admissions:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAdmissions()
    }, [])

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            const response = await fetch("/api/admissions", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            })
            if (response.ok) {
                fetchAdmissions()
            }
        } catch (error) {
            console.error("Error updating status:", error)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700'
            case 'Rejected': return 'bg-red-100 text-red-700'
            default: return 'bg-yellow-100 text-yellow-700'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Admission Applications</h1>
                <Button variant="outline">Export Data</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader2 className="h-10 w-10 text-primary animate-spin" />
                            <p className="text-muted-foreground animate-pulse">Loading applications...</p>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed rounded-xl">
                            <p className="text-muted-foreground">No applications found.</p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium bg-muted/50 text-sm">
                                <div className="col-span-3">Applicant Name</div>
                                <div className="col-span-3">Course</div>
                                <div className="col-span-2">Date Applied</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>
                            {applications.map((app: any) => (
                                <div key={app.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm hover:bg-muted/10 transition-colors">
                                    <div className="col-span-3 font-medium">
                                        {app.fullName}
                                        <div className="text-xs text-muted-foreground">{app.contact}</div>
                                    </div>
                                    <div className="col-span-3 text-muted-foreground uppercase">{app.program}</div>
                                    <div className="col-span-2 text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</div>
                                    <div className="col-span-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="View Details">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        {app.status === 'Pending' && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                                                    title="Approve"
                                                    onClick={() => handleStatusChange(app.id, 'Approved')}
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                                                    title="Reject"
                                                    onClick={() => handleStatusChange(app.id, 'Rejected')}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
