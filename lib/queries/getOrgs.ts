"use server"

import { notFound } from "next/navigation";
import fetchData from "../fetchData";
import { OrgsT } from "../types/mainPage";

export const getOrgs = async (): Promise<OrgsT> => {
    const query = /* GraphGL */ `
      query Orgs {
        org {
          data {
            attributes {
              main {
                title
                url
                image {
                  data {
                    attributes { url }
                  }
                }
              }
              support {
                title
                url
                image {
                  data {
                    attributes { url }
                  }
                }
              }
              partners {
                title
                url
                image {
                  data {
                    attributes { url }
                  }
                }
              }
              co_organizers {
                title
                url
                image {
                  data {
                    attributes { url }
                  }
                }
              }
            }
          }
        }
      }
    `;
  
    const json = await fetchData<{ 
      data: { 
        org: { 
          data: OrgsT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Orgs"
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (json.data.org.data === null) notFound();
    
    const data = OrgsT.parse(json.data.org.data);
    
    return data;
  };