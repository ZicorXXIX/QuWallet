"use client"
import { useSession } from "next-auth/react";


export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      Hello {session.data?.user?.name ?? "guest"}

      {JSON.stringify(session)}
   </div>
  );
}