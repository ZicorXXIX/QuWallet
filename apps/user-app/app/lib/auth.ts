import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import db from "@repo/db/client"

export const authOptions = {
        providers:[
            CredentialsProvider({
            name: 'Credentials',
            credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "+91 00000 00000" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials?.phone
                    }
                });


                if(existingUser){
                    const valid = await bcrypt.compare(credentials?.password, existingUser.password);
                    if(valid) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }


                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch (error) {
                    console.error(error);                    
                }
                return null;   
                
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}