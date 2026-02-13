import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Seed Admissions
    const admissionsPath = path.join(process.cwd(), 'lib/admissions.json')
    if (fs.existsSync(admissionsPath)) {
        const admissionsData = JSON.parse(fs.readFileSync(admissionsPath, 'utf8'))
        for (const admission of admissionsData) {
            // Skip if already exists (check by duplicate unique fields if any, or just create)
            // Since we are migrating, we might just want to create. 
            // Note: ID in JSON might conflict with autoincrement, so we let DB handle ID or force it if needed.
            // For simplicity, we create new entries and let DB assign IDs.
            await prisma.admission.create({
                data: {
                    fullName: admission.fullName,
                    dateOfBirth: admission.dob, // Fixed mapping
                    gender: admission.gender,
                    parentName: admission.guardianName, // Fixed mapping
                    contactNumber: admission.contact, // Fixed mapping
                    email: admission.email || `applicant${admission.id}@example.com`, // Mock email if missing
                    address: admission.address,
                    course: admission.program, // Fixed mapping
                    previousSchool: admission.previousEducation, // Fixed mapping
                    gradePercentage: admission.gradePercentage || "N/A",
                    status: admission.status || "Pending",
                    createdAt: admission.createdAt ? new Date(admission.createdAt) : new Date(),
                }
            })
        }
        console.log(`Seeded ${admissionsData.length} admissions`)
    }

    // 2. Seed Publications
    const publicationsPath = path.join(process.cwd(), 'lib/publications.json')
    if (fs.existsSync(publicationsPath)) {
        const publicationsData = JSON.parse(fs.readFileSync(publicationsPath, 'utf8'))
        for (const pub of publicationsData) {
            await prisma.publication.create({
                data: {
                    title: pub.title,
                    category: pub.category,
                    author: pub.author,
                    date: pub.date,
                    description: pub.description,
                    coverImage: pub.coverImage,
                    downloadLink: pub.downloadLink,
                }
            })
        }
        console.log(`Seeded ${publicationsData.length} publications`)
    }

    // 3. Seed Settings
    const settingsPath = path.join(process.cwd(), 'lib/settings.json')
    if (fs.existsSync(settingsPath)) {
        const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
        await prisma.settings.create({
            data: {
                institutionName: settingsData.institutionName,
                email: settingsData.email,
                phone: settingsData.phone,
                address: settingsData.address,
                facebook: settingsData.socials?.facebook || "#",
                twitter: settingsData.socials?.twitter || "#",
                instagram: settingsData.socials?.instagram || "#",
                youtube: settingsData.socials?.youtube || "#", // Fixed: settingsData.youtube -> settingsData.socials.youtube
            }
        })
        console.log('Seeded settings')
    }

    // 4. Seed Mock News (from page.tsx)
    const mockNews = [
        {
            title: "Annual Islamic Conference 2025",
            date: "2025-10-15",
            status: "Published",
            category: "Events"
        },
        {
            title: "Admissions Open for Academic Year 2026",
            date: "2025-09-01",
            status: "Published",
            category: "Admissions"
        },
        {
            title: "New Library Wing Inaugurated",
            date: "2025-08-20",
            status: "Draft",
            category: "Campus"
        }
    ]
    for (const news of mockNews) {
        await prisma.newsItem.create({ data: news })
    }
    console.log('Seeded 3 mock news items')

    // 5. Seed Mock Alumni
    const mockAlumni = [
        {
            name: "Dr. Ahmed Bilal",
            year: "2010",
            position: "Senior Researcher",
            visible: true
        },
        {
            name: "Fatima Zahra",
            year: "2012",
            position: "Software Engineer",
            visible: true
        },
        {
            name: "Usthad Kareem",
            year: "2008",
            position: "Imam & Khatib",
            visible: false
        }
    ]
    for (const alum of mockAlumni) {
        await prisma.alumniProfile.create({ data: alum })
    }
    console.log('Seeded 3 mock alumni profiles')

    // 6. Seed Mock Messages
    const mockMessages = [
        {
            name: "John Doe",
            email: "john@example.com",
            subject: "Admission Inquiry",
            message: "I would like to know the fee structure for the Hifz course.",
            date: "2025-10-10",
            read: false
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            subject: "Volunteering Opportunity",
            message: "Are there any openings for teaching English on weekends?",
            date: "2025-10-09",
            read: true
        },
        {
            name: "Ali Kahn",
            email: "ali@example.com",
            subject: "Donation",
            message: "I want to contribute to the library fund. Please guide me.",
            date: "2025-10-08",
            read: false
        }
    ]
    for (const msg of mockMessages) {
        await prisma.contactMessage.create({ data: msg })
    }
    console.log('Seeded 3 mock messages')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
