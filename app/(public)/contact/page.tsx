"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const }
}

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        }

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                alert("Message sent successfully!")
                e.currentTarget.reset()
            } else {
                alert("Failed to send message. Please try again.")
            }
        } catch (error) {
            console.error("Error sending message:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-accent/30 py-24 px-4 md:px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-20"
                >
                    <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl mb-4">
                        <MessageSquare className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-serif">Get in Touch</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Have questions or need assistance? Our team is here to support your educational journey.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
                    {/* Contact Information & Map */}
                    <motion.div
                        {...fadeInUp}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="grid gap-6">
                            {[
                                {
                                    title: "Visit Our Campus",
                                    desc: "Subulussunna Housing Complex, 123 Islamic Center Rd, City Name",
                                    icon: MapPin,
                                    color: "bg-emerald-50 text-emerald-600"
                                },
                                {
                                    title: "Call Us",
                                    desc: "+91 98765 43210 / +91 12345 67890",
                                    icon: Phone,
                                    color: "bg-blue-50 text-blue-600"
                                },
                                {
                                    title: "Email Us",
                                    desc: "info@subulussunna.edu / admissions@subulussunna.edu",
                                    icon: Mail,
                                    color: "bg-purple-50 text-purple-600"
                                },
                            ].map((item, i) => (
                                <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0", item.color)}>
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-primary font-serif">{item.title}</h3>
                                            <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden bg-background relative shadow-2xl border-4 border-white group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale" />
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground relative z-10 transition-transform duration-700 group-hover:scale-105">
                                <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl">
                                    <MapPin className="h-10 w-10 mx-auto mb-3 text-primary animate-bounce" />
                                    <h4 className="font-bold text-primary mb-1">Campus Location</h4>
                                    <p className="text-sm">Click to open Google Maps</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-background">
                            <CardHeader className="p-8 md:p-12 pb-4">
                                <CardTitle className="text-3xl font-serif text-primary">Send a Message</CardTitle>
                                <CardDescription className="text-lg">We typically respond within 24-48 hours.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 md:p-12 pt-4">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Your Name</label>
                                            <Input name="name" placeholder="John Doe" required className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Email Address</label>
                                            <Input name="email" type="email" placeholder="john@example.com" required className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-primary" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground ml-1">Subject</label>
                                        <Input name="subject" placeholder="Admission Inquiry" required className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground ml-1">How can we help?</label>
                                        <textarea
                                            name="message"
                                            className="flex min-h-[180px] w-full rounded-2xl bg-muted/30 border-none px-4 py-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Tell us about your requirements..."
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-16 rounded-2xl text-xl font-bold shadow-2xl hover:scale-[1.01] transition-all" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending Information..." : "Send Message"}
                                        {!isSubmitting && <Send className="h-5 w-5 ml-3" />}
                                    </Button>

                                    <div className="flex items-center justify-center gap-6 pt-4 text-muted-foreground">
                                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            SSL Secured
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            Spam Protected
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

