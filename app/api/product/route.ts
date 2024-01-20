import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"



export async function POST(request: Request) {
    const body: any = await request.json()
    try {
        const product = await prisma.product.findMany({
            where: { ...body },
            select: {
                name: true,
                id: true,
                description: true,
                url: true,
                price: true,
                images: true
            }
        })
        return NextResponse.json(product)
    }
    catch (error) {
        console.log('Error creating the post', error)
        return NextResponse.error()
    }
}
