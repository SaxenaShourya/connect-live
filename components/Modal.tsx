import React, { ReactNode } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  buttonText: string;
  buttonIcon?: ReactNode;
  buttonColor?: string;
  handleClick: () => void;
  isLoading: boolean;
  isCentered?: boolean;
}

const ModalDialog = ({
  isOpen,
  onClose,
  title,
  description,
  buttonText,
  buttonIcon,
  buttonColor,
  handleClick,
  children,
  isLoading,
  isCentered,
}: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="dark max-w-[24rem]"
      placement="center"
    >
      <ModalContent>
        <ModalHeader
          className={cn(
            "font-calSans flex flex-col gap-1 tracking-wide text-2xl px-3",
            { "text-center": isCentered }
          )}
        >
          {title}
        </ModalHeader>
        <ModalBody
          className={cn("px-3", {
            "flex justify-center items-center": isCentered,
          })}
        >
          {description ? <p>{description}</p> : children}
        </ModalBody>
        <ModalFooter
          className={cn("px-3", {
            "flex justify-center items-center": isCentered,
          })}
        >
          <Button
            color="danger"
            variant="bordered"
            className={cn("font-semibold", { "w-1/2": isCentered })}
            onPress={onClose}
          >
            Close
          </Button>
          <Button
            color="primary"
            className={`${
              !buttonColor ? "bg-primary-1" : buttonColor
            } font-semibold ${isCentered ? "w-1/2" : ""}`}
            onPress={handleClick}
            isLoading={isLoading}
            startContent={buttonIcon}
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDialog;
