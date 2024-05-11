import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "@/components/magic/bento-grid";
import Globe from "@/components/magic/globe";
import {
  CalendarIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import { Building2, LogIn } from "lucide-react";
import Orgs from "./Orgs";
import Ripple from "@/components/magic/ripple";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutBento() {

  

  const features = [
    {
      Icon: LogIn,
      name: "Онлайн регистрация",
      description: "Регистрируйтесь и получайте уведомления",
      href: "/reg",
      cta: "Подробнее",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute w-full [mask-image:linear-gradient(to_top,transparent_0%,#000_50%)]">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20">
            <Link href="/reg" passHref className='z-10'>
              <Button variant="secondary" className='font-medium text-base tracking-tighter bg-background/90 hover:text-background hover:bg-primary/90 p-6'>
                Регистрация
              </Button>
            </Link>
            <Ripple classNameItem="bg-foreground/10" />
          </div>
        </div>
      ),
    },
    {
      Icon: Building2,
      name: "Организации",
      description: "Организаторы съезда и партнеры",
      href: "/#orgs",
      cta: "Подробнее",
      className: "col-span-3 lg:col-span-2",
      background: <Orgs />
    },
    {
      Icon: GlobeIcon,
      name: "Место проведения",
      description: "г. Красноярск, пр. Свободный, 82",
      href: "/",
      cta: "Подробнее",
      className: "col-span-3 lg:col-span-2",
      background: (
        <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105 -right-80" />
      ),
    },
    {
      Icon: CalendarIcon,
      name: "Даты проведения",
      description: "6 - 10 октября 2025 года.",
      className: "col-span-3 lg:col-span-1",
      href: "/",
      cta: "Подробнее",
      background: (
        <Calendar
          mode="range"
          disabled
          fromDate={new Date(2025, 9, 6, 0, 0, 0)}
          toDate={new Date(2025, 9, 10, 0, 0, 0)}
          selected={{from: new Date(2025, 9, 6, 0, 0, 0), to: new Date(2025, 9, 10, 0, 0, 0)}}
          className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_60%)] group-hover:scale-105"
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
