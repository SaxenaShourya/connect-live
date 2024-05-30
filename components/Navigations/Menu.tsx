"use client";
import React, { useState } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/nextjs";

import ModalDialog from "../Modal";

import { LuMenu as MenuIcon } from "react-icons/lu";
import { HiOutlineHome as Home } from "react-icons/hi2";
import {
  TbCalendarUp as Upcoming,
  TbCalendarDown as Previous,
} from "react-icons/tb";
import { IoIosAddCircleOutline as Add } from "react-icons/io";
import { BsCameraReels as Camera } from "react-icons/bs";
import { RiShutDownLine as SignOut } from "react-icons/ri";

const Menu = () => {
  const router = useRouter();

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
    <>
      <Dropdown className="dark bg-default-200">
        <DropdownTrigger>
          <Button
            className="bg-primary-1 text-white"
            startContent={<MenuIcon />}
            isIconOnly
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown Navigations">
          <DropdownItem
            key="home"
            color="success"
            className="text-white"
            startContent={<Home />}
            description="View your dashboard"
            onClick={() => router.push("/")}
          >
            Home
          </DropdownItem>
          <DropdownItem
            key="upcoming"
            color="success"
            className="text-white"
            startContent={<Upcoming />}
            description="View your upcoming meetings"
            onClick={() => router.push("/upcomings")}
          >
            Upcoming
          </DropdownItem>
          <DropdownItem
            key="previous"
            color="success"
            className="text-white"
            startContent={<Previous />}
            description="View your previous meetings"
            onClick={() => router.push("/previous")}
          >
            Previous
          </DropdownItem>
          <DropdownItem
            key="recordings"
            color="success"
            className="text-white"
            startContent={<Camera />}
            description="View your recordings"
            onClick={() => router.push("/recordings")}
          >
            Recordings
          </DropdownItem>
          <DropdownItem
            key="personal-room"
            color="success"
            className="text-white"
            startContent={<Add />}
            description="Create your own personal room"
            onClick={() => router.push("/personal-room")}
          >
            Personal Room
          </DropdownItem>

          <DropdownItem
            key="signout"
            color="danger"
            startContent={<SignOut />}
            description="Sign out from your account."
            onClick={() => setIsOpen(true)}
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ModalDialog
        title="Sign out Confirmation?"
        description="Are you sure you want to sign out? You will need to sign in again to access your account."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonText="Sign out"
        handleClick={handleSignOut}
        isLoading={isLoading}
      />
    </>
  );
};

export default Menu;
