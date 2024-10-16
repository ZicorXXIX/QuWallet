import prisma from "@repo/db/client";
import { AddMoneyCard } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
<<<<<<< HEAD
    return txns.map((t: {
        id: number,
        status: any,
        token: string,
        provider: string,
        amount: number,
        startTime: Date,
        userId: number,
=======
    return txns.map((t:{
        id: number;
        status: any;
        token: string;
        provider: string;
        amount: number;
        startTime: Date;
        userId: number;
>>>>>>> 3aa7c801e162121da14b47922af164cf19dc410c
    }) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}