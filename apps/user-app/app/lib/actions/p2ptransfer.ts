"use server"
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";




export async function p2ptransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions) 
    const from = session?.user?.id;
    if (!from) {
        return { error: "User not found" }
    }

    const toUser = await db.user.findUnique({
        where: {
            number: to,
        }
    })

    if (!toUser) {
        return { error: "User not found" }
    }

    await db.$transaction( async (tx)=>{
        tx.$queryRaw`SELECT * FROM BALANCE WHERE userId = $(parseInt(from)) FOR UPDATE`
        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: Number(from)
            }
        })

        if (!fromBalance || fromBalance.amount < amount) {
            return { error: "Insufficient balance" }
        }

        //Decrement the balance Amount from sender
        await tx.balance.update({
            where: {
                userId: Number(from)
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })

        //Increment the balance Amount to receiver
        await tx.balance.update({
            where: {
                userId: toUser.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        })

        // id         Int      @id @default(autoincrement())
        // amount     Int
        // timestamp  DateTime
        // fromUserId Int
        // fromUser   User     @relation(name: "FromUserRelation", fields: [fromUserId], references: [id])
        // toUserId   Int
        // toUser     User     @relation(name: "ToUserRelation", fields: [toUserId], references: [id])

        await tx.p2pTransfer.create({
            data: {
                fromUserId: parseInt(from),
                toUserId: Number(toUser.id),
                timestamp: new Date(),
                amount: amount
            }
        })
    })
}