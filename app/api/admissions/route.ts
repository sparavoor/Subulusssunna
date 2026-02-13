import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const admissions = await prisma.admission.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(admissions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch admissions" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Handle potential field mismatches from frontend if any
        const newAdmission = await prisma.admission.create({
            data: {
                fullName: body.fullName,
                dateOfBirth: body.dob || body.dateOfBirth,
                gender: body.gender,
                parentName: body.guardianName || body.parentName,
                contactNumber: body.contact || body.contactNumber,
                email: body.email,
                address: body.address,
                course: body.program || body.course,
                previousSchool: body.previousEducation || body.previousSchool,
                gradePercentage: body.gradePercentage || "N/A",
                status: "Pending"
            }
        });

        return NextResponse.json(newAdmission, { status: 201 });
    } catch (error) {
        console.error("Admission create error:", error);
        return NextResponse.json({ error: "Failed to save admission" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        const updatedAdmission = await prisma.admission.update({
            where: { id: Number(id) },
            data: { status }
        });

        return NextResponse.json(updatedAdmission);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update admission" }, { status: 500 });
    }
}
