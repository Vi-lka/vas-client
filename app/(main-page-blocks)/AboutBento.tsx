import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "@/components/magic/bento-grid";
import Globe from "@/components/magic/globe";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import { Network } from "lucide-react";
import Orgs from "./Orgs";

export default function AboutBento() {

  

  const features = [
    {
      Icon: FileTextIcon,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: (
          <p>Цель</p>
      ),
    },
    {
      Icon: Network,
      name: "Организации",
      description: "Организаторы съезда и партнеры",
      href: "/#orgs",
      cta: "Подробнее",
      className: "col-span-3 lg:col-span-2",
      background: <Orgs />
    },
    {
      Icon: GlobeIcon,
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
      background: (
        <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
      ),
    },
    {
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      className: "col-span-3 lg:col-span-1",
      href: "/",
      cta: "Learn more",
      background: (
        <Calendar
          mode="single"
          selected={new Date(2022, 4, 11, 0, 0, 0)}
          className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
        />
      ),
    },
  ];

  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
