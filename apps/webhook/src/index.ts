import express from "express";
import db from "@repo/db/client"

const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const body = req.body;
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    console.log("Received request: ", paymentInformation.userId);
    // Update balance in db, add txn

    try {
        const txn = await db.onRampTransaction.findUnique({
            where: {
                token: paymentInformation.token
            }
        })

        if (!txn) {
            res.status(400).json({ message: "Invalid token" });
            return;
        }

        if(txn.status === "Success") {
            res.status(200).json({ message: "Transaction already processed" });
        }

        await db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
    
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])

        res.status(200).json({ message: "Payment successful" });
        
    } catch (error) {
        
        console.error("Error processing payment: ", error);
        res.status(500).json({ message: "Error processing payment" });
        
    }
    
})

app.listen(3003, () => {
    console.log("Server running on port 3003");
})