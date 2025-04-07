"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientWrapper({ children }) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      {session?.user && <Navbar />}
      <main className="flex-grow">{children}</main>
      {session?.user && <Footer />}
    </div>
  );
}