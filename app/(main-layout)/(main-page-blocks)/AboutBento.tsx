import { Calendar } from "@/components/ui/calendar";
import type { BentoCardProps} from "@/components/magic/bento-grid";
import { BentoCard, BentoGrid } from "@/components/magic/bento-grid";
import {
  CalendarIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import { Building2, LogIn, User2 } from "lucide-react";
import Image from 'next/image';
import Orgs from "./Orgs";
import Ripple from "@/components/magic/ripple";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CalendarLink from "@/components/CalendarLink";
import fetchData from "@/lib/fetchData";
import fixDanglingPrefix from "@/lib/fixDanglingPrefix";
import getRegistration from "@/lib/queries/getRegistration";

export default async function AboutBento() {

  const getAddress = async (): Promise<string> => {
    const query = /* GraphGL */ `
      query Address {
        place {
          data {
            attributes {
              address
            }
          }
        }
      }
    `;
  
    const json = await fetchData<{ 
      data: { 
        place: { 
          data: {
            attributes: { address: string }
          } 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Address"
    })
    
    const address = json.data.place.data.attributes.address;
    
    return address;
  };
  
  const [ addressResult, registration ] = await Promise.allSettled([ getAddress(), getRegistration() ]);
  const registrationEnabled = registration.status === "fulfilled" ? registration.value : true

  const features: Array<BentoCardProps | undefined> = [
    registrationEnabled ? 
    {
      Icon: LogIn,
      name: "Онлайн регистрация",
      description: "Регистрируйтесь и\u00A0получайте уведомления",
      href: "/sign-up",
      cta: "Перейти",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute w-full [mask-image:linear-gradient(to_top,transparent_0%,#000_50%)]">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20">
            <Link href="/sign-up" passHref className='z-10'>
              <Button variant="secondary" className='font-medium text-base tracking-tighter bg-background/90 hover:text-background hover:bg-primary/90 p-6'>
                Регистрация
              </Button>
            </Link>
            <Ripple classNameItem="bg-foreground/10" />
          </div>
        </div>
      ),
    } : {
      Icon: User2,
      name: "Личный аккаунт",
      description: "Позволяет редактировать заявку",
      href: "/sign-in",
      cta: "Перейти",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute w-full [mask-image:linear-gradient(to_top,transparent_0%,#000_50%)]">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20">
            <Link href="/sign-in" passHref className='z-10'>
              <Button variant="secondary" className='font-medium text-base tracking-tighter bg-background/90 hover:text-background hover:bg-primary/90 p-6'>
                Вход
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
      description: "Организаторы съезда и\u00A0партнеры",
      href: "/#orgs",
      cta: "Подробнее",
      className: "col-span-3 lg:col-span-2",
      background: <Orgs />
    },
    {
      Icon: GlobeIcon,
      name: "Место проведения",
      description: addressResult.status !== "rejected" 
        ? fixDanglingPrefix(addressResult.value) 
        : "Ознакомьтесь с\u00A0местом проведения съезда и\u00A0городом Красноярск",
      href: "/#place",
      cta: "Подробнее",
      // href: `https://maps.yandex.ru/?text=г. Красноярск, пр. Свободный, 82`,
      // cta: "Открыть на карте",
      // children: (
      //   <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
      //     <Link href={`https://maps.yandex.ru/?text=г. Красноярск, пр. Свободный, 82`} target="_blank" className="">
      //       Открыть на карте
      //       <ArrowRightIcon className="ml-2 h-4 w-4" />
      //     </Link>
      //   </Button>
      // ),
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] sm:top-10 top-12 sm:-right-80 -right-20 transition-all duration-300 ease-out group-hover:scale-105">
          <Link href="/#place" passHref className="w-fit h-fit">
            <Image 
              src={"/globe.png"} 
              alt={"Globe"}
              width={600}
              height={600}
              className="w-auto ml-auto mr-0 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
            />
          </Link>
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
  ]
  const filteredFeatures = features.filter(item => !!item);

  return (
    <div className='flex items-center pt-24 container'>
      <BentoGrid>
        {filteredFeatures.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
