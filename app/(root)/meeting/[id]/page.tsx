"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";

import MeetingRoom from "@/components/Meetings/MeetingRoom";
import MeetingSetup from "@/components/Meetings/MeetingSetup";
import Loader from "@/components/Loader";
import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { HiOutlineHome as Home } from "react-icons/hi2";

const Meeting = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const router = useRouter();

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call)
    return (
      <section className="flex flex-col space-y-5 h-screen w-full items-center justify-center">
        <h2 className="text-red-500 text-2xl md:text-3xl lg:text-4xl text-center text-balance">
          Call Not Found😣
        </h2>
        <Button
          className="bg-primary-1 text-white text-lg"
          startContent={<Home />}
          onPress={() => router.push("/")}
        >
          Return Home
        </Button>
      </section>
    );

  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return (
      <section className="flex flex-col space-y-5 h-screen w-full items-center justify-center">
        <h2 className="text-red-500 text-2xl md:text-3xl lg:text-4xl text-center text-balance">
          You are not allowed to join this meeting😞
        </h2>
        <Button
          className="bg-primary-1 text-white text-lg"
          startContent={<Home />}
          onPress={() => router.push("/")}
        >
          Return Home
        </Button>
      </section>
    );

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
