"use client";
import React from "react";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EndCallButtton = () => {
  const call = useCall();
  const router = useRouter();

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  if (!call) return toast.error("Unable to fetch call");

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push("/");
  };

  return (
    <Button onClick={endCall} color="danger" radius="lg">
      End call for everyone
    </Button>
  );
};

export default EndCallButtton;
