"use client";
import { useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";

import { FaUsers as Users } from "react-icons/fa";
import { LuLayoutList as LayoutList } from "react-icons/lu";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import Loader from "../Loader";
import EndCallButton from "../EndCallButton";
import { cn } from "@/lib/utils";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden px-4 py-4 md:px-8 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 px-4 md:px-8 py-2 flex w-full items-center justify-center gap-2 flex-wrap">
        <CallControls onLeave={() => router.push(`/`)} />
        <Dropdown className="dark">
          <DropdownTrigger className="cursor-pointer rounded-2xl bg-dark-2 hover:bg-[#4c535b] transition-all">
            <Button isIconOnly radius="lg" className="bg-dark-2 text-2xl">
              <LayoutList size={20} className="text-white" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem onClick={() => setLayout("grid")}>Grid</DropdownItem>
            <DropdownItem onClick={() => setLayout("speaker-right")}>
              Speaker Right
            </DropdownItem>
            <DropdownItem onClick={() => setLayout("speaker-left")}>
              Speaker Left
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <CallStatsButton />
        <Button
          isIconOnly
          onClick={() => setShowParticipants((prev) => !prev)}
          radius="lg"
          className="bg-dark-2 hover:bg-[#4c535b]"
        >
          <Users size={20} className="text-white" />
        </Button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
