import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const alumni = await prisma.alumniProfile.findMany({
            orderBy: { year: 'desc' }
        });
        return NextResponse.json(alumni);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch alumni" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newAlumni = await prisma.alumniProfile.create({
            data: {
                name: body.name,
                year: body.year,
                position: body.position,
                visible: body.visible !== undefined ? body.visible : true,
                image: body.image
            }
        });

        return NextResponse.json(newAlumni, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save alumni" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, visible } = body;

        const updatedAlumni = await prisma.alumniProfile.update({
            where: { id: Number(id) },
            data: { visible }
        });

        return NextResponse.json(updatedAlumni);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update alumni" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await prisma.alumniProfile.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ message: 'Alumni profile deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete alumni' }, { status: 500 });
    }
}
