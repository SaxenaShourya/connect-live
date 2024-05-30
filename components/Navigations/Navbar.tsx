import React from "react";
import Link from "next/link";
import Image from "next/image";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="h-[10vh] w-full flex px-4 py-2 justify-between border-b-2 border-dark-2">
      <div className="flex justify-center items-center xl:hidden">
        <Menu />
      </div>
      <div className="hidden sm:flex items-center space-x-4">
        <Image src="/arrow.gif" width={30} height={30} alt="arrow gif" />
        <Link
          href="https://www.linkedin.com/in/shouryasaxena/"
          target="_blank"
          className="text-xl transition-all relative animateBottom"
        >
          Contact Me
        </Link>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Navbar;
