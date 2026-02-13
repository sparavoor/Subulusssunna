import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newMessage = await prisma.contactMessage.create({
            data: {
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message,
                date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                read: false
            }
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, read } = body;

        const updatedMessage = await prisma.contactMessage.update({
            where: { id: Number(id) },
            data: { read }
        });

        return NextResponse.json(updatedMessage);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await prisma.contactMessage.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ message: 'Message deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
