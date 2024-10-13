"use server"
import prisma from "@repo/db/client"
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export default async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);

    if(!session?.user || !session?.user?.id) {
        return {
            error: "user not found"
        }
    }
    
    // id        Int          @id @default(autoincrement())
    // status    OnRampStatus
    // token     String       @unique
    // provider  String
    // amount    Int
    // startTime DateTime
    // userId    Int
    // user      User         @relation(fields: [userId], references: [id])

    const token = (Math.random() * 1000).toString();

    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            amount: amount*100,
            startTime: new Date(),
            userId: parseInt(session.user.id),
            provider: provider,
            token: token
        }
    })

    return {
        token: token,
        success: "true"
    }


}