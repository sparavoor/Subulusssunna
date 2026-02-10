import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import fs from "fs/promises";
import path from "path";

async function getSettings() {
    try {
        const filePath = path.join(process.cwd(), "lib", "settings.json");
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return {
            institutionName: "Subulussunna",
            email: "info@subulussunna.edu",
            phone1: "+91 98765 43210",
            address: "Subulussunna Housing Complex, City Name"
        };
    }
}

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSettings();

    return (
        <>
            <Navbar institutionName={settings.institutionName} />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} />
        </>
    );
}
