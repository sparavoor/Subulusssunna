"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Courses", href: "/#courses" },
    { name: "News", href: "/news" },
    { name: "Publications", href: "/publications" },
    { name: "Alumni", href: "/alumni" },
    { name: "Contact", href: "/contact" },
    { name: "Student Portal", href: "/login" },
]

export function Navbar({ institutionName = "Subulussunna" }: { institutionName?: string }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b py-2 shadow-sm" : "bg-transparent py-4"
            )}
        >
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
                        <span className="sr-only">{institutionName}</span>
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg transition-transform group-hover:scale-110">
                            {institutionName.charAt(0)}
                        </div>
                        <span className={cn(
                            "font-bold text-2xl tracking-tight font-serif transition-colors",
                            scrolled ? "text-primary" : "text-primary-foreground md:text-primary"
                        )}>
                            {institutionName}
                        </span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className={cn(
                            "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
                            scrolled ? "text-foreground" : "text-primary-foreground md:text-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-10">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-semibold leading-6 transition-all hover:text-secondary relative group",
                                scrolled ? "text-foreground" : "text-primary-foreground md:text-foreground"
                            )}
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Button asChild className={scrolled ? "shadow-md" : "shadow-lg"}>
                        <Link href="/admission">Apply Now</Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile menu with Framer Motion */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 lg:hidden"
                        >
                            <div className="flex items-center justify-between">
                                <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                                    <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                        {institutionName.charAt(0)}
                                    </div>
                                    <span className="font-bold text-xl text-primary font-serif">{institutionName}</span>
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-10 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-4 py-6">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-lg font-medium leading-7 text-foreground hover:bg-muted/50 transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <Button className="w-full h-12 text-lg" asChild>
                                            <Link href="/admission">Apply Now</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}
