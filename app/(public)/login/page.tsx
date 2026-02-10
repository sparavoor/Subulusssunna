"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { GraduationCap, Phone, Calendar as CalendarIcon, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function StudentLoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        contact: "",
        dob: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // Simulate authentication
        // Real logic would query a DB for a student with these credentials
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (formData.contact && formData.dob) {
            router.push("/student/dashboard")
        } else {
            setError("Invalid credentials. Please use your registered contact number and date of birth.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100-vh-4rem)] flex items-center justify-center p-4 bg-accent/30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl mb-4"
                    >
                        <GraduationCap className="h-8 w-8" />
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Student Portal</h1>
                    <p className="text-muted-foreground mt-2">Access your academic profile & resources</p>
                </div>

                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
                    <CardHeader className="space-y-1 pt-10 px-8 text-center">
                        <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
                        <CardDescription>Enter your registered details to sign in</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-10 pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm flex items-center gap-3 border border-destructive/20"
                                >
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground ml-1 flex items-center gap-2">
                                    <Phone className="h-3 w-3" /> Contact Number
                                </label>
                                <Input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary"
                                    required
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground ml-1 flex items-center gap-2">
                                    <CalendarIcon className="h-3 w-3" /> Date of Birth
                                </label>
                                <Input
                                    type="date"
                                    className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary"
                                    required
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-xl text-lg font-bold shadow-xl hover:scale-[1.02] transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="bg-muted/30 p-6 flex justify-center border-t border-muted">
                        <p className="text-xs text-muted-foreground text-center">
                            Having trouble logging in? <br className="sm:hidden" />
                            <a href="/contact" className="text-secondary font-bold hover:underline">Contact Administration</a>
                        </p>
                    </CardFooter>
                </Card>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Subulussunna Student Management</p>
                </div>
            </motion.div>
        </div>
    )
}
