import React from "react";
import {
  Skeleton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

const MeetingListSkeleton = ({ skeletons }: { skeletons: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:grid-cols-3">
      {Array.from({ length: skeletons }, (_, index) => (
        <Card
          className="min-h-[232px] min-w-[330px] bg-dark-2/30 dark p-4"
          radius="lg"
          key={index}
        >
          <CardHeader className="p-1">
            <Skeleton className="rounded-full mb-4 size-12">
              <div className="size-12 rounded-full bg-secondary"></div>
            </Skeleton>
          </CardHeader>
          <CardBody className="p-1">
            <Skeleton className="w-3/5 rounded-lg mb-2">
              <div className="h-3 w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg mb-2">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg mb-6">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </CardBody>
          <CardFooter className="p-1">
            <Skeleton className="bg-secondary w-full h-12 rounded-lg"></Skeleton>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MeetingListSkeleton;
