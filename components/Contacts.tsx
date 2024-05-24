import fetchData from "@/lib/fetchData";
import type { ContactsItemT} from "@/lib/types/mainPage";
import { ContactsT } from "@/lib/types/mainPage";
import { notFound } from "next/navigation";
import ErrorHandler from "./errors/ErrorHandler";
import { TypographyH3, TypographyH5 } from "./typography";
import Link from "next/link";
import { AtSign, MapPin, PhoneCall, UserRound } from "lucide-react";

export default async function Contacts() {

    const getContacts = async (): Promise<ContactsT> => {
      const query = /* GraphGL */ `
        query Contacts {
          contact {
            data {
              attributes {
                items {
                  title
                  places {
                      title
                      address
                      link
                  }
                  persons {
                    title
                    description
                    tel
                    email
                  }
                }
              }
            }
          }
        }
      `;
    
      const json = await fetchData<{ 
        data: { 
          contact: { 
            data: ContactsT 
          } 
        }; 
      }>({ 
        query, 
        error: "Failed to fetch Contacts"
      })
    
      // await new Promise((resolve) => setTimeout(resolve, 2000))
    
      if (json.data.contact.data === null) notFound();
      
      const data = ContactsT.parse(json.data.contact.data);
      
      return data;
    };
      
    const [ dataResult ] = await Promise.allSettled([ getContacts() ]);
    if (dataResult.status === "rejected") return (
      <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Контакты"
        notFound={false}
      />
    )
  
    return (
        <div className="self-start">
            <TypographyH3 className="mb-3 sm:text-left text-center">Контакты</TypographyH3> 
            <div className="grid grid-cols-1 gap-8">
                {dataResult.value.attributes.items.map((item, indx) => (
                    <ContactsItem key={indx} data={item} />
                ))}
            </div>
        </div>
    )
}

function ContactsItem({ 
    data 
}: {
    data: ContactsItemT
}) {
    return (
        <div className="">
            <TypographyH5 className="mb-4 tracking-tight leading-5 sm:text-left text-center">{data.title}</TypographyH5>

            <div className="grid grid-cols-1 gap-4">
                <ul className="text-sm grid grid-cols-1 gap-3">
                    {data.places.map((place, indx) => (
                        <li key={indx} className="flex flex-col gap-0.5">
                            <Link 
                                href={`https://maps.yandex.ru/?text=${place.address}`} 
                                className="flex gap-2 font-medium underline-offset-2 hover:underline hover:underline-offset-4 transition-all duration-300"
                            >
                                <MapPin className="w-5 h-5" />
                                <p className="flex-1">{place.address}</p>
                            </Link>
                            {place.link ? (
                                <Link 
                                    href={place.link} 
                                    className="ml-7 font-light underline-offset-2 hover:underline hover:underline-offset-4 transition-all duration-300"
                                >
                                    {place.title}
                                </Link>
                            ) : (
                                <p className="ml-7 font-light">{place.title}</p>
                            )}
                        </li>
                    ))}
                </ul>
                <ul className="text-sm grid sm:grid-cols-2 gap-6">
                    {data.persons.map((person, indx) => (
                        <li key={indx} className="grid grid-cols-1 gap-2">
                            <div className="flex gap-2">
                                <UserRound className="w-5 h-5" />
                                <div className="flex-1">
                                    <p className="font-medium">{person.title}</p>
                                    <p className="text-muted-foreground text-xs">{person.description}</p>
                                </div>
                            </div>
                            <Link 
                                href={`tel:${person.tel}`} 
                                className="flex gap-2 underline-offset-2 hover:underline hover:underline-offset-4 transition-all duration-300"
                            >
                                <PhoneCall className="w-5 h-5" />
                                <p className="font-medium flex-1">{person.tel}</p>
                            </Link>
                            <Link 
                                href={`mailto:${person.email}`} 
                                className="flex gap-2 underline-offset-2 hover:underline hover:underline-offset-4 transition-all duration-300"
                            >
                                <AtSign className="w-5 h-5" />
                                <p className="font-medium flex-1">{person.email}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}