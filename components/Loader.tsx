import React from "react";
import { Skeleton } from "@nextui-org/react";

const Loader = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center space-y-2 lg:space-y-6 p-2">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary-1/40 text-center">
        ConnectLive.
      </h1>
      <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-dark-2/90 text-center">
        Loading the experience.
      </h2>
      <h3 className="text-2xl md:text-3xl lg:text-4xl text-dark-2/90 text-center">
        Please stay tuned
      </h3>
      <div className="flex gap-x-2">
        <Skeleton className="dark bg-dark-2/60 rounded-full">
          <div className="size-6"></div>
        </Skeleton>
        <Skeleton className="dark bg-dark-2/60 rounded-full flex gap-x-2">
          <div className="size-6"></div>
        </Skeleton>
        <Skeleton className="dark bg-dark-2/60 rounded-full flex gap-x-2">
          <div className="size-6"></div>
        </Skeleton>
      </div>
    </section>
  );
};

export default Loader;
