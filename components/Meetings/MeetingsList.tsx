"use client";
import { useEffect, useState } from "react";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCalls } from "@/hooks/useGetCalls";
import MeetingListSkeleton from "../Skeletons/MeetingListSkeleton";
import MeetingCard from "./MeetingCard";

import { IoPlayOutline as Play } from "react-icons/io5";
import {
  TbCalendarUp as Upcoming,
  TbCalendarDown as Previous,
} from "react-icons/tb";
import { BsCameraReels as Recordings } from "react-icons/bs";

const MeetingsList = ({
  type,
}: {
  type: "ended" | "upcoming" | "recordings";
}) => {
  const router = useRouter();
  const {
    endedCalls,
    upcomingCalls,
    callRecordings,
    isLoading: callLoading,
  } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Meetings.";
      case "upcoming":
        return "No Upcoming Meetings.";
      case "recordings":
        return "No Recordings.";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (callLoading) return <MeetingListSkeleton skeletons={6} />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:grid-cols-3">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended" ? (
                <Previous className="size-6" />
              ) : type === "upcoming" ? (
                <Upcoming className="size-6" />
              ) : (
                <Recordings className="size-6" />
              )
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon={<Play />}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default MeetingsList;
