import { IconType } from "react-icons";

interface Links {
  icon: IconType;
  label: string;
  route: string;
}

// Icons
import { HiOutlineHome as Home } from "react-icons/hi2";
import { TbCalendarUp, TbCalendarDown } from "react-icons/tb";
import { IoIosAddCircleOutline as Add } from "react-icons/io";
import { BsCameraReels as Camera } from "react-icons/bs";

const sidebarLinks: Links[] = [
  {
    icon: Home,
    label: "Home",
    route: "/",
  },
  {
    icon: TbCalendarUp,
    label: "Upcoming",
    route: "/upcomings",
  },
  {
    icon: TbCalendarDown,
    label: "Previous",
    route: "/previous",
  },
  {
    icon: Camera,
    label: "Recordings",
    route: "/recordings",
  },
  {
    icon: Add,
    label: "Personal Room",
    route: "/personal-room",
  },
];

export default sidebarLinks;
