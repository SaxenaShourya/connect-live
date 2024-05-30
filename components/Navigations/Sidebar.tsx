"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, useClerk } from "@clerk/nextjs";
import { RiShutDownLine as SignOut } from "react-icons/ri";

import ModalDialog from "../Modal";
import sidebarLinks from "@/constants/sidebarLinks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";

const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error("Error in signing out:", error);
      toast.error("Unexpected Internal Server Error");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <nav className="hidden xl:flex h-screen w-[20%] py-4 flex-col items-center border-r-2 border-dark-2">
      <h1 className="px-4 text-2xl mt-4 mb-6 text-primary-4">Connect Live.</h1>
      <div className="flex flex-col h-full w-full px-3">
        {sidebarLinks.map(({ route, icon: Icon, label }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              href={route}
              key={label}
              className={cn(
                "flex gap-4 items-center px-3 py-2 rounded-[8px] justify-start mb-6 hover:bg-dark-2 transition-all",
                {
                  "bg-primary-1 hover:bg-primary-1/75": isActive,
                }
              )}
            >
              <Icon />
              <p className="text-lg font-semibold">{label}</p>
            </Link>
          );
        })}
        <div className="mt-auto">
          <SignedIn>
            <button
              onClick={() => setIsOpen(true)}
              className="flex w-full gap-4 items-center px-3 py-2 rounded-[8px] justify-start hover:bg-red-600 transition-all"
            >
              <SignOut />
              <p className="text-lg font-semibold">Sign Out</p>
            </button>
          </SignedIn>
        </div>
      </div>

      <ModalDialog
        title="Sign out Confirmation?"
        description="Are you sure you want to sign out? You will need to sign in again to access your account."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonText="Sign out"
        handleClick={handleSignOut}
        isLoading={isLoading}
      />
    </nav>
  );
};

export default Sidebar;
