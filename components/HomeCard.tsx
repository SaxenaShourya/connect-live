import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Card {
  icon: ReactNode;
  title: string;
  subtitle: string;
  className: string;
  onClick?: () => void;
}

const HomeCard = ({ icon, title, subtitle, className, onClick }: Card) => {
  return (
    <div
      className={cn(
        "p-6 rounded-[12px] shadow-md flex flex-col items-start cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="mb-12 glassmorphism rounded-[6px] p-2">{icon}</div>
      <h3 className="text-xl font-semibold tracking-wide">{title}</h3>
      <p className="text-white text-sm">{subtitle}</p>
    </div>
  );
};

export default HomeCard;
