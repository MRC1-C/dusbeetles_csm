import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"



export async function POST(request: Request) {
    const body: any = await request.json()
    try {
        const post = await prisma.category.findMany({
            where: { ...body },
            select: {
                id: true,
                name: true,
                description: true,
                url: true
            }
        })
        return NextResponse.json(post)
    }
    catch (error) {
        console.log('Error creating the post', error)
        return NextResponse.error()
    }
}
