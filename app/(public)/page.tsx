"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar, Quote, CheckCircle2, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [settings, setSettings] = useState({
    institutionName: "Subulussunna Islamic Institution",
    tagline: "Excellence in Islamic and Secular Education",
    heroVerse: "\"Read! In the name of your Lord who created.\" (Surah Al-Alaq 96:1)"
  });

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Error loading settings:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary text-primary-foreground overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background z-1" />

        <div className="relative z-10 container px-4 md:px-6 text-center space-y-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 backdrop-blur-sm text-secondary-foreground text-sm font-medium tracking-wider uppercase mb-4"
          >
            Welcome to Subulussunna
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-serif leading-[1.1]"
          >
            {settings.institutionName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl font-light max-w-3xl mx-auto opacity-90 leading-relaxed font-serif italic"
          >
            {settings.heroVerse}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform" asChild>
              <Link href="/admission">Apply for Admission</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 animate-bounce opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Stats / Features Grid */}
      <section className="py-12 bg-background relative z-20 -mt-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Students", value: "500+" },
              { label: "Graduates", value: "2000+" },
              { label: "Faculty", value: "45+" },
              { label: "Years Excellence", value: "15+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="bg-card p-6 md:p-8 rounded-3xl shadow-xl border border-primary/5 flex flex-col items-center text-center"
              >
                <span className="text-3xl md:text-5xl font-bold font-serif text-primary mb-2">{stat.value}</span>
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              {...fadeInUp}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase">Our Philosophy</h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-serif leading-tight">
                  Shaping Minds, <br /> Nurturing Souls
                </h3>
              </div>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {settings.institutionName} is dedicated to providing comprehensive education that balances traditional Islamic sciences with modern academic excellence.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  "Qualified & Experienced Faculty",
                  "Integrated Curriculum (Religious & Secular)",
                  "State-of-the-art Facilities"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-colors">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="rounded-full px-8 h-12" asChild>
                <Link href="/about">Discover Our Story</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1523050853064-8504bad82420?auto=format&fit=crop&q=80"
                alt="Campus life"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section id="courses" className="py-24 bg-accent/30 rounded-[5rem] mx-4 md:mx-0">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            {...fadeInUp}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase">Learning Paths</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-serif">Academic Programs</h3>
            <p className="text-xl text-muted-foreground max-w-[800px]">
              We provide a holistic learning environment that empowers students to excel in both spiritual and academic spheres.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Hifz Course",
                desc: "Master the memorization of the Holy Quran with precise Tajweed and rhythm.",
                icon: BookOpen,
                color: "bg-emerald-50 text-emerald-600"
              },
              {
                title: "Islamic Studies",
                desc: "Explore deep insights into Fiqh, Hadith, Tafseer, and the rich history of Islam.",
                icon: BookOpen,
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "General Education",
                desc: "Comprehensive modern education following international standards and local curricula.",
                icon: BookOpen,
                color: "bg-amber-50 text-amber-600"
              },
            ].map((course, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-background">
                  <CardHeader className="p-8 pb-4">
                    <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", course.color)}>
                      <course.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-serif text-primary">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="text-muted-foreground text-lg leading-relaxed">{course.desc}</p>
                  </CardContent>
                  <CardFooter className="px-8 pb-8">
                    <Button variant="ghost" className="w-full justify-between h-12 rounded-xl group-hover:bg-primary group-hover:text-white transition-all" asChild>
                      <Link href="/courses">Learn More <ArrowRight className="h-4 w-4 ml-2" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            {...fadeInUp}
            className="flex items-end justify-between mb-12"
          >
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase text-left">Community Feed</h2>
              <h3 className="text-4xl font-bold tracking-tight text-primary font-serif">Latest News</h3>
            </div>
            <Button variant="outline" className="rounded-full px-6" asChild>
              <Link href="/news">View Campus Hub</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid gap-8 md:grid-cols-3"
          >
            {[1, 2, 3].map((i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] overflow-hidden group">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?auto=format&fit=crop&q=80&w=800`}
                      alt="News"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">Campus Life</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-3 font-medium tracking-wide">
                      <Calendar className="h-3 w-3 mr-1.5" />
                      <span>JUNE {12 + i}, 2025</span>
                    </div>
                    <h3 className="font-bold text-xl line-clamp-2 mb-3 group-hover:text-primary transition-colors font-serif">
                      Strategic partnership announced with international educational body
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      This collaboration aims to enhance our digital curriculum and provide students with global exchange programs...
                    </p>
                    <Link href="/news/slug" className="inline-flex items-center text-sm font-bold text-secondary hover:underline">
                      Read Article <ArrowRight className="h-3 w-3 ml-1.5" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-primary-foreground rounded-[5rem] mx-4 mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Voices of Success</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">What Our Alumni Say</h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3].map((i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white rounded-[2rem] h-full flex flex-col">
                  <CardContent className="pt-10 pb-10 flex-1 flex flex-col items-center">
                    <Quote className="h-10 w-10 text-secondary mb-6 opacity-60" />
                    <p className="text-white/80 italic text-lg leading-relaxed mb-8">
                      "My time here was beyond graduation; it was a character-building journey that prepared me for the challenges of the modern world with an unshakable moral compass."
                    </p>
                    <div className="mt-auto flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-secondary/30">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Alumni" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg text-white font-serif">Abdullah Faisal</p>
                        <p className="text-xs text-secondary font-bold uppercase tracking-widest">Class of 2021 • Software Architect</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
