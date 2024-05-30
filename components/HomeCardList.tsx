"use client";
import React, { useState } from "react";
import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Textarea, DatePicker, Input } from "@nextui-org/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import moment from "moment-timezone";

import HomeCard from "./HomeCard";
import ModalDialog from "./Modal";

// Icons
import { IoAddOutline as New, IoCopyOutline as Copy } from "react-icons/io5";
import { CiCalendar as Schedule } from "react-icons/ci";
import { HiOutlineUsers as Join } from "react-icons/hi2";
import { BsCamera as Recordings } from "react-icons/bs";
import { BsFillPatchCheckFill as Check } from "react-icons/bs";

const HomeCardList = () => {
  const [meetingType, setMeetingType] = useState<
    "InstantMeeting" | "JoinMeeting" | "ScheduleMeeting" | undefined
  >(undefined);
  const [meetingData, setMeetingData] = useState({
    description: "",
    id: "",
  });
  const [meetingDate, setMeetingDate] = useState(now(getLocalTimeZone()));
  const [callDetail, setCallDetail] = useState<Call>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user)
      return toast.error("Unexpected Internal Server Error");

    try {
      setIsLoading(true);

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) toast.error("Failed to create meeting");

      const startsAt =
        moment
          .tz(
            { ...meetingDate, month: meetingDate?.month - 1 },
            meetingDate?.timeZone
          )
          .format("YYYY-MM-DDTHH:mm:ssZ") || new Date(Date.now()).toISOString();

      const description = meetingData.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetail(call);

      if (!meetingData.description) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.log(error);
      return toast.error("Unexpected Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const joinMeeting = async () => {
    if (!client || !user)
      return toast.error("Unexpected Internal Server Error");

    if (!meetingData.id) {
      return toast.error("Meeting ID is required!");
    }

    try {
      setIsLoading(true);

      router.push(`meeting/${meetingData?.id}`);
    } catch (error) {
      console.log(error);
      return toast.error("Unexpected Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 gap-6">
        <HomeCard
          icon={<New className="size-8" />}
          title="New Meeting"
          subtitle="Initiate a meeting instantly with a single click."
          className="bg-primary-1 hover:opacity-80 transition-all"
          onClick={() => setMeetingType("InstantMeeting")}
        />
        <HomeCard
          icon={<Join className="size-8" />}
          title="Join Meeting"
          subtitle="Enter the meeting ID to join an existing meeting."
          className="bg-primary-2 hover:opacity-80 transition-all"
          onClick={() => setMeetingType("JoinMeeting")}
        />
        <HomeCard
          icon={<Schedule className="size-8" />}
          title="Schedule Meeting"
          subtitle="Plan and schedule meetings for a future."
          className="bg-primary-3 hover:opacity-80 transition-all"
          onClick={() => setMeetingType("ScheduleMeeting")}
        />
        <HomeCard
          icon={<Recordings className="size-8" />}
          title="View Recordings"
          subtitle="Access and watch past meeting recordings."
          className="bg-primary-4 hover:opacity-80 transition-all"
          onClick={() => router.push("/recordings")}
        />
      </div>

      {/* Instant Meeting Modal */}
      <ModalDialog
        isOpen={meetingType === "InstantMeeting"}
        onClose={() => setMeetingType(undefined)}
        title="Start an Instant Meeting"
        description="Begin a new meeting immediately. Invite participants and start collaborating in real-time without any delay."
        buttonText="Start Meeting"
        handleClick={createMeeting}
        isLoading={isLoading}
        buttonIcon={<New />}
      />

      {/* Join Meeting Modal */}
      <ModalDialog
        isOpen={meetingType === "JoinMeeting"}
        onClose={() => setMeetingType(undefined)}
        title="Join Meeting"
        buttonText="Join Meeting"
        handleClick={joinMeeting}
        isLoading={isLoading}
        buttonColor="bg-primary-2"
        buttonIcon={<Join />}
      >
        <Input
          label="Meeting Invitation Id"
          isClearable
          isRequired
          placeholder="Meeting Id"
          onChange={(e) =>
            setMeetingData({ ...meetingData, id: e.target.value })
          }
        />
      </ModalDialog>

      {/* Schedule Meeting Modals */}
      {!callDetail ? (
        <ModalDialog
          isOpen={meetingType === "ScheduleMeeting"}
          onClose={() => {
            setMeetingType(undefined);
          }}
          title="Schedule Meeting"
          buttonText="Schedule Meeting"
          handleClick={createMeeting}
          isLoading={isLoading}
          buttonColor="bg-primary-3"
          buttonIcon={<Schedule />}
        >
          <Textarea
            label="Description"
            onChange={(e) =>
              setMeetingData({ ...meetingData, description: e.target.value })
            }
          />
          <DatePicker
            label="Date and Time"
            value={meetingDate}
            aria-label="Date Picker"
            granularity="minute"
            onChange={setMeetingDate}
            className="dark"
          />
        </ModalDialog>
      ) : (
        <ModalDialog
          isOpen={meetingType === "ScheduleMeeting"}
          onClose={() => setMeetingType(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
          buttonIcon={<Copy />}
          buttonText="Copy Meeting Link"
          isLoading={isLoading}
          buttonColor="bg-primary-3"
          isCentered
        >
          <Check className="size-32 text-primary-4" />
        </ModalDialog>
      )}

      {/* Join Meeting Modal*/}
    </>
  );
};

export default HomeCardList;
