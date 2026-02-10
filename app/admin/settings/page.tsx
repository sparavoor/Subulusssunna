"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Save, Loader2 } from "lucide-react"

export default function AdminSettingsPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState({
        institutionName: "",
        tagline: "",
        heroVerse: "",
        phone1: "",
        phone2: "",
        email: "",
        address: "",
        facebookUrl: "",
        instagramUrl: "",
        twitterUrl: ""
    })

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                setSettings(data)
                setLoading(false)
            })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setSettings((prev) => ({ ...prev, [id]: value }))
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            })
            if (res.ok) {
                alert("Settings saved successfully! Redirecting to landing page...")
                router.push("/")
            } else {
                alert("Failed to save settings.")
            }
        } catch (error) {
            alert("Error saving settings.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Website Settings</h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Information</CardTitle>
                        <CardDescription>Update the institution&apos;s basic details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Institution Name</label>
                            <Input id="institutionName" value={settings.institutionName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tagline / Motto</label>
                            <Input id="tagline" value={settings.tagline} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Quranic Verse (Home Page)</label>
                            <Input id="heroVerse" value={settings.heroVerse} onChange={handleChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Details</CardTitle>
                        <CardDescription>This information will appear on the Contact page and Footer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number 1</label>
                                <Input id="phone1" value={settings.phone1} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number 2</label>
                                <Input id="phone2" value={settings.phone2} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input id="email" value={settings.email} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Address</label>
                            <textarea
                                id="address"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={settings.address}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Social Media Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Facebook URL</label>
                                <Input id="facebookUrl" value={settings.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Instagram URL</label>
                                <Input id="instagramUrl" value={settings.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Twitter URL</label>
                                <Input id="twitterUrl" value={settings.twitterUrl} onChange={handleChange} placeholder="https://twitter.com/..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button size="lg" onClick={handleSave} disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
