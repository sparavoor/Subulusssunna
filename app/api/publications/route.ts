import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const publications = await prisma.publication.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(publications);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newPublication = await prisma.publication.create({
            data: {
                title: body.title,
                category: body.category,
                author: body.author,
                date: body.date,
                description: body.description,
                coverImage: body.coverImage,
                downloadLink: body.downloadLink
            }
        });

        return NextResponse.json(newPublication, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save publication' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await prisma.publication.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ message: 'Publication deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete publication' }, { status: 500 });
    }
}
