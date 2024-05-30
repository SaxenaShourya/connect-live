"use client";
import { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { Button, Checkbox } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import moment from "moment";

import { HiOutlineHome as Home } from "react-icons/hi2";
import { HiMiniUserPlus as Join } from "react-icons/hi2";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;
  const router = useRouter();

  const call = useCall();

  if (!call) return toast.error("Unable to fetch call");

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived) {
    return (
      <section className="flex flex-col space-y-5 h-screen w-full items-center justify-center p-6">
        {" "}
        <h2 className="text-red-500 text-2xl md:text-3xl lg:text-4xl text-center text-pretty">
          Your Meeting has not started yet. <br /> It is scheduled for{" "}
          <span className="text-green-500">
            {moment(callStartsAt).format("Do MMMM YYYY, h:mm A")}😕
          </span>
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
  }

  if (callHasEnded) {
    return (
      <section className="flex flex-col space-y-5 h-screen w-full items-center justify-center">
        <h2 className="text-red-500 text-2xl md:text-3xl lg:text-4xl text-center text-pretty">
          The call has been ended by the host😒
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
  }

  const joinMeeting = async () => {
    try {
      await call.join();
      setIsSetupComplete(true);
    } catch (error) {
      console.log(error);
      toast.error("Unable to join the Meeting");
    }
  };

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold text-primary-4">
        Meeting Setup
      </h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <Checkbox
          isSelected={isMicCamToggled}
          onChange={(e) => setIsMicCamToggled(e.target.checked)}
          className="dark"
        >
          Join with mic and camera off
        </Checkbox>
        <DeviceSettings />
      </div>
      <Button
        className="bg-green-500 text-white px-4 py-2.5"
        radius="lg"
        onClick={joinMeeting}
        startContent={<Join />}
      >
        Join meeting
      </Button>
    </section>
  );
};

export default MeetingSetup;
