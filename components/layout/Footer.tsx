import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"

interface FooterProps {
    settings: {
        institutionName: string
        email: string
        phone1: string
        address: string
    }
}

export function Footer({ settings }: FooterProps) {
    return (
        <footer className="bg-primary text-primary-foreground pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-primary font-bold shadow-xl">
                                {settings.institutionName.charAt(0)}
                            </div>
                            <span className="text-2xl font-bold tracking-tight font-serif">{settings.institutionName}</span>
                        </div>
                        <p className="text-lg leading-relaxed text-primary-foreground/70 max-w-sm">
                            Providing holistic Islamic and secular education to empower a new generation of leaders.
                        </p>
                        <div className="flex space-x-5">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300">
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-8">Navigation</h3>
                        <ul role="list" className="space-y-4">
                            {[
                                { name: "About Us", href: "/#about" },
                                { name: "Academic Programs", href: "/#courses" },
                                { name: "Admission Portal", href: "/admission" },
                                { name: "Campus News", href: "/news" },
                                { name: "Alumni Stories", href: "/alumni" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-base text-primary-foreground/70 hover:text-white flex items-center group">
                                        {link.name}
                                        <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-8">Contact Info</h3>
                        <ul role="list" className="space-y-6">
                            <li className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-secondary" />
                                </div>
                                <span className="text-base text-primary-foreground/70 leading-relaxed">{settings.address}</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Phone className="h-5 w-5 text-secondary" />
                                </div>
                                <span className="text-base text-primary-foreground/70">{settings.phone1}</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-secondary" />
                                </div>
                                <span className="text-base text-primary-foreground/70">{settings.email}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-8">Stay Updated</h3>
                        <p className="text-base text-primary-foreground/70 mb-6">
                            Subscribe to our monthly newsletter for campus highlights.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                required
                                className="w-full h-12 rounded-xl bg-white/10 border-none px-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-secondary transition-all"
                                placeholder="Your email address"
                            />
                            <button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-secondary text-white font-bold hover:bg-secondary/80 transition-all shadow-lg"
                            >
                                Join Newsletter
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-primary-foreground/50" suppressHydrationWarning>
                        &copy; {new Date().getFullYear()} {settings.institutionName}. Crafted with honor.
                    </p>
                    <div className="flex gap-8 text-sm text-primary-foreground/50">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
