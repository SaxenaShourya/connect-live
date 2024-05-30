"use client";
import React from "react";
import HomeCardList from "@/components/HomeCardList";
import { useUser } from "@clerk/nextjs";

const HomePage = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  const { user } = useUser();

  return (
    <section className="w-full h-full lg:h-[90vh] px-6 py-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl mb-6 text-center text-pretty">
        Hello,{" "}
        <span className="text-primary-1">{`${user?.username || "there"}`}</span>{" "}
        👋 Welcome to <span className="text-primary-4">ConnectLive🎉</span>
      </h1>
      <div className="h-[303px] w-full rounded-lg bg-hero-2 lg:bg-hero bg-cover flex flex-col p-5 md:p-8 lg:p-11 justify-center items-center lg:justify-start lg:items-start">
        <h3 className="text-3xl font-extrabold lg:text-5xl">{time}</h3>
        <p className="text-xl font-medium text-sky-1 lg:text-2xl">{date}</p>
      </div>
      <HomeCardList />
    </section>
  );
};

export default HomePage;
