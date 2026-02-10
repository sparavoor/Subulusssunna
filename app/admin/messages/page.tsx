"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Mail, MailOpen } from "lucide-react"

// Mock Data
const initialMessages = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        subject: "Admission Inquiry",
        message: "I would like to know the fee structure for the Hifz course.",
        date: "2025-10-10",
        read: false
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Volunteering Opportunity",
        message: "Are there any openings for teaching English on weekends?",
        date: "2025-10-09",
        read: true
    },
    {
        id: 3,
        name: "Ali Kahn",
        email: "ali@example.com",
        subject: "Donation",
        message: "I want to contribute to the library fund. Please guide me.",
        date: "2025-10-08",
        read: false
    }
]

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState(initialMessages)

    const toggleReadStatus = (id: number) => {
        setMessages(messages.map(m => m.id === id ? { ...m, read: !m.read } : m))
    }

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this message?")) {
            setMessages(messages.filter(m => m.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Contact Messages</h1>

            <div className="grid gap-6">
                {messages.map((msg) => (
                    <Card key={msg.id} className={`transition-colors ${msg.read ? 'bg-card' : 'bg-muted/30 border-l-4 border-l-primary'}`}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    {msg.subject}
                                    {!msg.read && <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground">
                                    From: <span className="font-medium text-foreground">{msg.name}</span> ({msg.email})
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                                {msg.date}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mt-2 mb-4 whitespace-pre-wrap">{msg.message}</p>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleReadStatus(msg.id)}
                                >
                                    {msg.read ? (
                                        <><Mail className="mr-2 h-3 w-3" /> Mark as Unread</>
                                    ) : (
                                        <><MailOpen className="mr-2 h-3 w-3" /> Mark as Read</>
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDelete(msg.id)}
                                >
                                    <Trash2 className="mr-2 h-3 w-3" /> Delete
                                </Button>
                                <Button size="sm" asChild>
                                    <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}>Reply</a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <MailOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No messages found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
