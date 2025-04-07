"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">

          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D97706]"></div>
          </div>


          <h2 className="text-xl font-bold text-[#1F2937] mb-2">Preparing Your Kitchen</h2>
          <p className="text-[#1F2937]/80 mb-6">Gathering fresh ingredients...</p>


          <div className="w-full bg-[#FFFBEF] rounded-full h-2.5">
            <div className="bg-[#65A30D] h-2.5 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#FFFBEF] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Welcome to Flavor Exchange</h1>
              <p className="text-[#1F2937]/80">Share your culinary creations with our community</p>
            </div>

            <button
              onClick={() => signIn('github', { redirectTo: '/' })}
              className="w-full flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B65D04] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Sign in with GitHub
            </button>

            <div className="mt-6 text-sm text-[#1F2937]/60">
              By signing in, you agree to our <a href="#" className="text-[#D97706] hover:underline">Terms</a> and <a href="#" className="text-[#D97706] hover:underline">Privacy Policy</a>.
            </div>
          </div>

          <div className="bg-[#65A30D]/10 py-4 text-center border-t border-[#1F2937]/10">
            <p className="text-sm text-[#1F2937]">
              New around here? <a href="#" className="font-medium text-[#D97706] hover:underline">Learn more</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Page;