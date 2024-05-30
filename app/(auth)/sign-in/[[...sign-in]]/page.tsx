import React from "react";
import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import AuthSkeleton from "@/components/Skeletons/AuthSkeleton";

import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"], weight: "700" });

const SignInPage = () => {
  return (
    <section className="w-full min-h-screen h-full flex flex-col justify-center items-center">
      <ClerkLoaded>
        <h2
          className={`${nunito.className} text-xl sm:text-2xl md:text-3xl mb-2`}
        >
          Sign in to{" "}
          <span className="font-calSans text-primary-4">Connect Live</span>
        </h2>
        <SignIn />
      </ClerkLoaded>
      <ClerkLoading>
        <AuthSkeleton className="h-[28rem]" inputs={2} footers={1} />
      </ClerkLoading>
    </section>
  );
};

export default SignInPage;
