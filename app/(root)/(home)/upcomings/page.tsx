import React from "react";
import MeetingsList from "@/components/Meetings/MeetingsList";

const Upcoming = () => {
  return (
    <section className="flex w-full h-[90vh] py-2 px-4 flex-col gap-4 text-white overflow-y-auto">
      <h1 className="text-3xl text-center text-primary-2">Upcoming Meetings</h1>

      <MeetingsList type="upcoming" />
    </section>
  );
};

export default Upcoming;
