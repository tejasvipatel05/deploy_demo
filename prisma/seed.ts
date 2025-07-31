// prisma/seed.ts

import { PrismaClient } from "@/app/generated/prisma";


const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting fresh seed...");

    const books = await prisma.books.createMany({
        data:[
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
            },
            {
                title: "1984",
                author: "George Orwell",
            },
            // {
            //     title: "Pride and Prejudice",  
            //     author: "Jane Austen",
            // }
        ]
    })
}