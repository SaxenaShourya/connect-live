"use client";
import React, { ReactNode } from "react";
import { Button, CardFooter } from "@nextui-org/react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import moment from "moment";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { toast } from "react-toastify";
import { IoCopyOutline as Copy } from "react-icons/io5";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: ReactNode;
  isPreviousMeeting?: boolean;
  buttonIcon?: ReactNode;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <Card
      className="min-h-[232px] min-w-[315px] bg-dark-2/30 dark p-4 space-y-2"
      radius="lg"
    >
      <CardHeader className="flex flex-col w-full items-start gap-2 p-1">
        <div className="p-3 rounded-full bg-primary-3 flex justify-center items-center">
          {icon}
        </div>
        <h1 className="text-2xl">{title}</h1>
        <p className="text-base font-normal">
          {moment(date).format("Do MMMM YYYY, h:mm A")}
        </p>
      </CardHeader>
      <CardBody className="pl-4">
        <AvatarGroup isBordered>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
      </CardBody>
      {!isPreviousMeeting && (
        <CardFooter className="flex gap-2 p-1">
          <Button
            onClick={handleClick}
            className="bg-primary-4 w-1/2"
            startContent={buttonIcon}
          >
            {buttonText}
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success("Link copied");
            }}
            className="bg-primary-1 w-1/2"
            startContent={<Copy />}
          >
            Copy Link
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MeetingCard;
