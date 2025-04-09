"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { GoHome } from "react-icons/go";
import { PiBookOpenTextLight } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex items-center justify-between bg-[#FFFBEF] p-2 border-b border-[#D97706]/20">
      {/* Branding Section */}
      <div className="flex items-center space-x-10">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl text-[#D97706]">Flavor Exchange</h1>
          <p className="text-sm text-[#1F2937]/80 -mt-1">Recipe Sharing Platform</p>
        </div>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="lg:hidden flex items-center space-x-4">
        <button onClick={toggleMenu} className="text-2xl text-[#1F2937]">
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-8">
        <Link
          href="/"
          className="flex items-center space-x-2 text-[#1F2937] hover:text-[#D97706] transition-colors group"
        >
          <GoHome className="text-xl group-hover:scale-110 transition-transform" />
          <span className="font-medium">Home</span>
        </Link>
        <Link
          href="/my-recipes"
          className="flex items-center space-x-2 text-[#1F2937] hover:text-[#D97706] transition-colors group"
        >
          <PiBookOpenTextLight className="text-xl group-hover:scale-110 transition-transform" />
          <span className="font-medium">My Recipes</span>
        </Link>
        <Link
          href="/favorites"
          className="flex items-center space-x-2 text-[#1F2937] hover:text-[#D97706] transition-colors group"
        >
          <IoMdHeartEmpty className="text-xl group-hover:scale-110 transition-transform" />
          <span className="font-medium">Favorites</span>
        </Link>
      </div>

      {/* Right Side - Profile and Sign Out */}
      <div className="hidden lg:flex items-center space-x-3">
        <button
          onClick={() => signOut()}
          className="px-3 py-1.5 text-sm rounded-lg text-[#1F2937] bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 transition-all border border-[#F43F5E]/20"
        >
          Sign Out
        </button>
        <Link
          href="/add-recipe"
          className="px-3 py-1.5 text-sm rounded-lg text-white bg-[#65A30D] hover:bg-[#4d7c0f] transition-all"
        >
          Add Recipe
        </Link>
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#D97706] hover:border-[#65A30D] transition-colors ml-2">
          <Image
            src={session?.user?.image || "/default-avatar.png"}
            alt={session?.user?.name || "User"}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-[#FFFBEF] p-6 space-y-4 border-t border-[#D97706]/20">
          <Link
            href="/"
            className="flex items-center space-x-2 text-[#1F2937] hover:text-[#D97706] transition-colors group"
            onClick={toggleMenu}
          >
            <GoHome className="text-xl group-hover:scale-110 transition-transform" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            href="/my-recipes"
            className="flex items-center space-x-2 text-[#1F2937] hover:text-[#D97706] transition-colors group"
            onClick={toggleMenu}
          >
            <PiBookOpenTextLight className="text-xl group-hover:scale-110 transition-transform" />
            <span className="font-medium">My Recipes</span>
          </Link>
          <Link
            href="/favorites"
            className="flex items-center space-x-2 text-[#1F2937] hover:text-[#D97706] transition-colors group"
            onClick={toggleMenu}
          >
            <IoMdHeartEmpty className="text-xl group-hover:scale-110 transition-transform" />
            <span className="font-medium">Favorites</span>
          </Link>
          <div className="mt-4">
            <button
              onClick={() => signOut()}
              className="w-full py-2 text-sm text-[#1F2937] bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 transition-all border border-[#F43F5E]/20 rounded-lg"
            >
              Sign Out
            </button>
            <Link
              href="/add-recipe"
              className="w-full mt-4 py-2 text-sm text-white bg-[#65A30D] hover:bg-[#4d7c0f] transition-all rounded-lg"
              onClick={toggleMenu}
            >
              Add Recipe
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
