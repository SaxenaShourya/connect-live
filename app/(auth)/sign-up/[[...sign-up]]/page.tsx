import React from "react";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"], weight: "700" });

import AuthSkeleton from "@/components/Skeletons/AuthSkeleton";

const SignUpPage = () => {
  return (
    <section className="w-full min-h-screen h-full flex flex-col justify-center items-center p-2">
      <ClerkLoaded>
        <h2
          className={`${nunito.className} text-xl sm:text-2xl md:text-3xl mb-2`}
        >
          Sign up to{" "}
          <span className="font-calSans text-primary-4">Connect Live</span>
        </h2>
        <SignUp />
      </ClerkLoaded>

      <ClerkLoading>
        <AuthSkeleton
          className="h-[36.5rem] justify-center"
          inputs={3}
          footers={2}
        />
      </ClerkLoading>
    </section>
  );
};

export default SignUpPage;
