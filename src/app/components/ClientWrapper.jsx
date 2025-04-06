"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function ClientWrapper({ children }) {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && <Navbar />}
      {children}
    </>
  );
}