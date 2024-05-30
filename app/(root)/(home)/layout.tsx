import React, { ReactNode } from "react";
import Navbar from "@/components/Navigations/Navbar";
import Sidebar from "@/components/Navigations/Sidebar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full h-full lg:h-screen flex">
      <Sidebar />

      <div className="flex flex-col w-full">
        <Navbar />
        <section className="flex h-full flex-col">{children}</section>
      </div>
    </main>
  );
};

export default HomeLayout;
