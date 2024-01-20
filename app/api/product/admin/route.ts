import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    try {
        const post = await prisma.product.create({
            data: body
        })
        return NextResponse.json(post)
    }
    catch (error) {
        console.log('Error creating the post', error)
        return NextResponse.error()
    }
}

export async function PATCH(request: Request) {
    const body: any = await request.json()
    const { id, ...data } = body
    try {
        const post = await prisma.product.update({
            where: { id: body.id },
            data: { ...data }
        })
        return NextResponse.json(post)
    }
    catch (error) {
        console.log('Error creating the post', error)
        return NextResponse.error()
    }
}

export async function DELETE(req: Request) {
    const body = await req.json()
    const { id } = body

    try {
        const deletedpost = await prisma.product.delete({
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