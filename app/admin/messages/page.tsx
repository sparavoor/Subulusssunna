"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Mail, MailOpen, Loader2 } from "lucide-react"

interface Message {
    id: number
    name: string
    email: string
    subject: string
    message: string
    date: string
    read: boolean
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages")
            const data = await res.json()
            setMessages(data)
        } catch (error) {
            console.error("Failed to fetch messages", error)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleReadStatus = async (id: number, currentRead: boolean) => {
        // Optimistic update
        setMessages(messages.map(m => m.id === id ? { ...m, read: !m.read } : m))

        try {
            await fetch("/api/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, read: !currentRead })
            })
        } catch (error) {
            console.error("Failed to update status", error)
            setMessages(messages.map(m => m.id === id ? { ...m, read: currentRead } : m))
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this message?")) return

        try {
            const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" })
            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id))
            }
        } catch (error) {
            console.error("Failed to delete", error)
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-6 flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Contact Messages</h1>

            <div className="grid gap-6">
                {messages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-dashed">
                        <MailOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No messages found.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
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
                                        onClick={() => toggleReadStatus(msg.id, msg.read)}
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
                    ))
                )}
            </div>
        </div>
    )
}
