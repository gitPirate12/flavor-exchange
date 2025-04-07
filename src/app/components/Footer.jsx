import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#FFFBEF] border-t border-[#D97706]/20 mt-auto py-6">
      <div className="container max-w-4xl mx-auto px-4">
        <p className="text-[#1F2937]/80 text-xs sm:text-sm text-center mb-4 leading-relaxed">
          Conceptualized in{" "}
          <Link
            href="https://www.banani.co"  
            target="_blank"
            rel="noopener noreferrer"
            className="px-0 text-[#1F2937] hover:text-[#D97706] font-medium text-xs sm:text-sm transition-colors"
          >
            banani.co
          </Link>{" "}
          and built using{" "}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-0 text-[#1F2937] hover:text-[#D97706] font-medium text-xs sm:text-sm transition-colors"
          >
            Next.js
          </Link>
          , and{" "}
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-0 text-[#1F2937] hover:text-[#D97706] font-medium text-xs sm:text-sm transition-colors"
          >
            Tailwind CSS
          </Link>
          , by yours truly.
        </p>

        <p className="text-[#1F2937]/60 text-xs text-center">
          © 2025 Flavor Exchange. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer