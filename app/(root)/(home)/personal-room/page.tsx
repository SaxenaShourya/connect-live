"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { IoCopyOutline as Copy } from "react-icons/io5";
import { IoPlayOutline as Play } from "react-icons/io5";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col flex-wrap gap-2 xl:flex-row">
      <h3 className="text-lg md:text-xl text-green-500">{title}:</h3>
      <p className="text-sm md:text-base text-wrap break-text">{description}</p>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startRoom = async () => {
    if (!client || !user)
      return toast.error("Unexpected Internal Server Error");

    try {
      setIsLoading(true);

      const newCall = client.call("default", meetingId!);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }

      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex w-full h-[90vh] flex-col justify-center items-center gap-4 text-white">
      <div className="border-2 w-[50%] min-w-[20rem] border-dark-2 rounded-lg px-4 py-6">
        <h1 className="text-3xl text-center text-primary-2 mb-6">
          Personal Meeting Room
        </h1>
        <div className="flex justify-center w-full flex-col gap-4 mb-6">
          <Table
            title="Topic"
            description={`${user?.username}'s Meeting Room`}
          />
          <Table title="Meeting ID" description={meetingId!} />
          <Table title="Invitation Link" description={meetingLink} />
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-primary-1 text-white w-1/2 px-2"
            onClick={startRoom}
            startContent={<Play />}
            isLoading={isLoading}
          >
            Start Meeting
          </Button>
          <Button
            className="bg-primary-4 text-white w-1/2 px-2"
            startContent={<Copy />}
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast.success("Meeting link copied!");
            }}
          >
            Copy Invitation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalRoom;
