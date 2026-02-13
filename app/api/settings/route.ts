import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const settings = await prisma.settings.findFirst();
        return NextResponse.json(settings || {});
    } catch (error) {
        return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Check if settings exist, if so update, else create
        const existingSettings = await prisma.settings.findFirst();

        let updatedSettings;
        if (existingSettings) {
            updatedSettings = await prisma.settings.update({
                where: { id: existingSettings.id },
                data: {
                    institutionName: body.institutionName,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    facebook: body.facebook || body.socials?.facebook,
                    twitter: body.twitter || body.socials?.twitter,
                    instagram: body.instagram || body.socials?.instagram,
                    youtube: body.youtube || body.socials?.youtube,
                }
            });
        } else {
            updatedSettings = await prisma.settings.create({
                data: {
                    institutionName: body.institutionName,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    facebook: body.facebook || body.socials?.facebook,
                    twitter: body.twitter || body.socials?.twitter,
                    instagram: body.instagram || body.socials?.instagram,
                    youtube: body.youtube || body.socials?.youtube,
                }
            });
        }

        return NextResponse.json({ message: "Settings saved successfully", settings: updatedSettings });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
    }
}
