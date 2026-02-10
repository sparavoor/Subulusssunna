import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

// Mock Data (In a real app, fetch based on ID)
const newsItems = [
    {
        id: 1,
        title: "Annual Islamic Conference 2025",
        content: `
      <p>We are delighted to announce the Annual Islamic Conference 2025, scheduled to take place on October 15th at the Main Auditorium.</p>
      <p>This year's theme is "Education and Ethics in the Modern World". We have invited distinguished scholars from various parts of the country to share their wisdom and insights.</p>
      <h3>Event Highlights:</h3>
      <ul>
        <li>Keynote address by Sheikh [Name]</li>
        <li>Panel discussions on contemporary challenges</li>
        <li>Student presentations</li>
        <li>Networking sessions</li>
      </ul>
      <p>All students, alumni, and general public are cordially invited to attend. Registration is free but mandatory.</p>
    `,
        date: "2025-10-15",
        author: "Admin",
        image: "/placeholder-news-1.jpg",
        category: "Events"
    },
    // Add other items if needed for testing, but basic logic is same
]

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const newsItem = newsItems.find(item => item.id === parseInt(id)) || {
        // Fallback for demo purposes if ID doesn't match mock data exactly
        id: id,
        title: "Sample News Article Title",
        content: "<p>This is a placeholder content for the news article. In a real application, this content would be fetched from a database based on the ID.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        date: "2025-10-10",
        author: "Admin",
        category: "General"
    }

    return (
        <div className="container py-12 px-4 md:px-6 max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" asChild>
                <Link href="/news">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
                </Link>
            </Button>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-md font-medium">{newsItem.category}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(newsItem.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><User className="h-4 w-4" /> {newsItem.author}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary leading-tight">{newsItem.title}</h1>
                </div>

                <div className="aspect-video bg-muted w-full rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        [Featured Image]
                    </div>
                </div>

                <div className="prose prose-lg max-w-none prose-green prose-headings:font-serif prose-headings:text-primary"
                    dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            </div>
        </div>
    )
}
