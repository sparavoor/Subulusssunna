"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2, ChevronRight, GraduationCap, User, Phone, MapPin, BookOpen, Upload } from "lucide-react"

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
}

export default function AdmissionPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch("/api/admissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                alert("Application submitted successfully!")
                    ; (e.target as HTMLFormElement).reset()
            } else {
                alert("Failed to submit application. Please try again.")
            }
        } catch (error) {
            console.error("Submission error:", error)
            alert("An error occurred. Please check your connection.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-accent/30 py-20 px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                        <GraduationCap className="h-4 w-4" />
                        Enrollment 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-serif">Apply for Admission</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Begin your journey of excellence. Fill out the application form below to join the Subulussunna family.
                    </p>
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
                        <CardHeader className="p-8 md:p-12 pb-6 bg-primary text-primary-foreground relative overflow-hidden">
                            <div className="relative z-10">
                                <CardTitle className="text-3xl font-serif mb-2">Student Application Form</CardTitle>
                                <CardDescription className="text-primary-foreground/70 text-lg">Provide precise details to help us process your application.</CardDescription>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        </CardHeader>
                        <CardContent className="p-8 md:p-12">
                            <form onSubmit={handleSubmit} className="space-y-10">

                                {/* Personal Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-secondary mb-2">
                                        <User className="h-5 w-5" />
                                        <h3 className="text-xl font-bold font-serif uppercase tracking-widest text-primary">Personal Details</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Full Name *</label>
                                            <Input name="fullName" required placeholder="Enter student's full name" className="h-12 rounded-xl focus:ring-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Date of Birth *</label>
                                            <Input name="dob" type="date" required className="h-12 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Gender *</label>
                                            <select
                                                name="gender"
                                                className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-primary"
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Nationality *</label>
                                            <Input name="nationality" placeholder="e.g. Indian" required className="h-12 rounded-xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* Guardian Details */}
                                <div className="space-y-6 pt-8 border-t border-muted">
                                    <div className="flex items-center gap-3 text-secondary mb-2">
                                        <Phone className="h-5 w-5" />
                                        <h3 className="text-xl font-bold font-serif uppercase tracking-widest text-primary">Guardian Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Guardian Name *</label>
                                            <Input name="guardianName" required placeholder="Parent/Guardian Name" className="h-12 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Contact Number *</label>
                                            <Input name="contact" type="tel" required placeholder="+91 98765 43210" className="h-12 rounded-xl" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1 flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> Permanent Address *
                                            </label>
                                            <textarea
                                                name="address"
                                                className="flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-primary"
                                                required
                                                placeholder="Enter full address"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Course Selection */}
                                <div className="space-y-6 pt-8 border-t border-muted">
                                    <div className="flex items-center gap-3 text-secondary mb-2">
                                        <BookOpen className="h-5 w-5" />
                                        <h3 className="text-xl font-bold font-serif uppercase tracking-widest text-primary">Academic Choice</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Select Program *</label>
                                            <select
                                                name="program"
                                                className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-primary"
                                                required
                                            >
                                                <option value="">Select a Program</option>
                                                <option value="hifz">Hifz Course (Quran Memorization)</option>
                                                <option value="islamic_studies">Advanced Islamic Studies</option>
                                                <option value="general">General Education</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Previous Education</label>
                                            <Input name="previousEducation" placeholder="e.g. 5th Standard" className="h-12 rounded-xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* Documents */}
                                <div className="space-y-6 pt-8 border-t border-muted">
                                    <div className="flex items-center gap-3 text-secondary mb-2">
                                        <Upload className="h-5 w-5" />
                                        <h3 className="text-xl font-bold font-serif uppercase tracking-widest text-primary">Supporting Documents</h3>
                                    </div>
                                    <div className="p-8 border-2 border-dashed border-muted rounded-2xl bg-muted/20 text-center space-y-4 hover:border-primary/30 transition-colors">
                                        <div className="h-12 w-12 rounded-full bg-white mx-auto flex items-center justify-center text-muted-foreground shadow-sm">
                                            <Upload className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold">Upload Marksheet / ID Proof</p>
                                            <p className="text-xs text-muted-foreground">PDF, JPG or PNG up to 5MB</p>
                                        </div>
                                        <Input type="file" className="hidden" id="file-upload" />
                                        <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById('file-upload')?.click()}>
                                            Select File
                                        </Button>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold shadow-xl hover:scale-[1.01] transition-all" disabled={isSubmitting}>
                                        {isSubmitting ? "Processing Application..." : "Submit Enrollment Request"}
                                        {!isSubmitting && <ChevronRight className="h-5 w-5 ml-2" />}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        { title: "Review", desc: "Our board reviews all applications carefully." },
                        { title: "Interview", desc: "Shortlisted candidates will be called for a meet." },
                        { title: "Approval", desc: "Final list will be announced within 7 working days." },
                    ].map((step, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-primary">{step.title}</h4>
                                <p className="text-sm text-muted-foreground">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
