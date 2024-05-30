"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { HiOutlineHome as Home } from "react-icons/hi2";

const NotFound = () => {
  const router = useRouter();

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        router.push("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center space-y-3 p-2">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary-1/40 text-center">
        ConnectLive.
      </h1>
      <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-dark-2/90 text-center">
        404
      </h2>
      <h3 className="text-3xl md:text-4xl lg:text-5xl text-dark-2/90 text-center">
        Page Not Found
      </h3>
      <p className="text-xl lg:text-3xl font-extrabold text-dark-2 text-center text-pretty">
        You will be redirecting to the home page in{" "}
        <span className="text-red-500/45">{countdown}s.</span>
      </p>
      <Button
        className="bg-primary-1 text-white text-lg"
        startContent={<Home />}
        onPress={() => router.push("/")}
      >
        Return Home
      </Button>
    </section>
  );
};

export default NotFound;
