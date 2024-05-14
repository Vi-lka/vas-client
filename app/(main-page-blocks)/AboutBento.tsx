import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "@/components/magic/bento-grid";
import {
  CalendarIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import { Building2, LogIn } from "lucide-react";
import Image from 'next/image';
import Orgs from "./Orgs";
import Ripple from "@/components/magic/ripple";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CalendarLink from "@/components/CalendarLink";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function AboutBento() {
  const features = [
    {
      Icon: LogIn,
      name: "Онлайн регистрация",
      description: "Регистрируйтесь и получайте уведомления",
      href: "/reg",
      cta: "Перейти",
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
      href: `https://maps.yandex.ru/?text=г. Красноярск, пр. Свободный, 82`,
      cta: "Открыть на карте",
      children: (
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
          <Link href={`https://maps.yandex.ru/?text=г. Красноярск, пр. Свободный, 82`} target="_blank" className="">
            Открыть на карте
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ),
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] sm:top-10 top-12 sm:-right-80 -right-20 transition-all duration-300 ease-out group-hover:scale-105">
          <Image 
            src={"/globe.png"} 
            alt={"Globe"}
            width={600}
            height={600}
            className="w-auto ml-auto mr-0 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
          />
        </div>
      ),
    },
    {
      Icon: CalendarIcon,
      name: "Даты проведения",
      description: "6 - 10 октября 2025 года.",
      className: "col-span-3 lg:col-span-1",
      href: "/",
      cta: "Подробнее",
      children: (
        <CalendarLink />
      ),
      background: (
        <CalendarLink>
          <Calendar
            mode="range"
            disabled
            fromDate={new Date(2025, 9, 6, 0, 0, 0)}
            toDate={new Date(2025, 9, 10, 0, 0, 0)}
            selected={{from: new Date(2025, 9, 6, 0, 0, 0), to: new Date(2025, 9, 10, 0, 0, 0)}}
            className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_60%)] group-hover:scale-105"
          />
        </CalendarLink>
      ),
    },
  ];

  return (
    <div className='flex items-center pt-24 container'>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
