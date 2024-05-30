import React from "react";
import MeetingsList from "@/components/Meetings/MeetingsList";

const Previous = () => {
  return (
    <section className="flex w-full h-[90vh] py-2 px-4 flex-col gap-4 text-white overflow-y-auto">
      <h1 className="text-3xl text-center text-primary-2">Previous Meetings</h1>

      <MeetingsList type="ended" />
    </section>
  );
};

export default Previous;
