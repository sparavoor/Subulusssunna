import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ADMISSIONS_FILE = path.join(process.cwd(), "lib", "admissions.json");

async function readAdmissions() {
    try {
        const data = await fs.readFile(ADMISSIONS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeAdmissions(admissions: any[]) {
    await fs.writeFile(ADMISSIONS_FILE, JSON.stringify(admissions, null, 2));
}

export async function GET() {
    const admissions = await readAdmissions();
    return NextResponse.json(admissions);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const admissions = await readAdmissions();

        const newAdmission = {
            ...body,
            id: Date.now(),
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        admissions.push(newAdmission);
        await writeAdmissions(admissions);

        return NextResponse.json(newAdmission, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save admission" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;
        const admissions = await readAdmissions();

        const index = admissions.findIndex((a: any) => a.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "Admission not found" }, { status: 404 });
        }

        admissions[index].status = status;
        await writeAdmissions(admissions);

        return NextResponse.json(admissions[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update admission" }, { status: 500 });
    }
}
