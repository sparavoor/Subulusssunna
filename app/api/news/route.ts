import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const news = await prisma.newsItem.findMany({
            orderBy: { date: 'desc' }
        });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newNews = await prisma.newsItem.create({
            data: {
                title: body.title,
                date: body.date,
                category: body.category,
                status: body.status || "Draft",
                content: body.content || "",
                image: body.image || ""
            }
        });

        return NextResponse.json(newNews, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save news" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await prisma.newsItem.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ message: 'News deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
    }
}
