
import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"
export async function POST(req: Request) {
    const body = await req.json()
    const { id } = body

    try {
        const deletedpost = await prisma.category.delete({
            where: {
                id
            }
        })
        return NextResponse.json(deletedpost)
    } catch (error) {
        console.error("Error deleting post", error)
        return NextResponse.error()
    }
}