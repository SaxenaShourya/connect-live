import React from "react";
import { Skeleton, Card } from "@nextui-org/react";
import { cn } from "@/lib/utils";

const AuthSkeleton = ({
  className,
  inputs,
  footers,
}: {
  className: string;
  inputs: number;
  footers: number;
}) => {
  return (
    <>
      <Skeleton className="rounded-lg w-[20rem] sm:w-[25rem] h-[4rem] mb-4 dark" />
      <Card
        className={cn(
          "w-[20rem] sm:w-[25rem] gap-y-2 p-4 dark flex flex-col bg-default-200 items-center",
          className
        )}
        radius="lg"
      >
        <Skeleton className="rounded-full mb-4">
          <div className="size-14 rounded-full bg-secondary"></div>
        </Skeleton>

        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg mb-6">
          <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
        </Skeleton>

        {Array.from({ length: inputs }, (_, index) => (
          <Skeleton className="w-[80%] h-[2rem] rounded-lg">
            <div className="size-full rounded-lg bg-secondary"></div>
          </Skeleton>
        ))}

        <div className="flex space-x-6 mt-6">
          <Skeleton className="w-[5rem] h-[4rem] rounded-xl"></Skeleton>
          <Skeleton className="w-[5rem] h-[4rem] rounded-xl"></Skeleton>
          <Skeleton className="w-[5rem] h-[4rem] rounded-xl"></Skeleton>
        </div>

        {Array.from({ length: footers }, (_, index) => (
          <Skeleton className="w-[90%] h-[3rem] rounded-lg mt-4"></Skeleton>
        ))}
      </Card>
    </>
  );
};

export default AuthSkeleton;
