import { redirect } from "next/navigation";
import { CurrentUserT } from "../types/users";

export const getCurrentUser = async (token: string): Promise<CurrentUserT> => {
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    };
    const query = /* GraphGL */ `
      query Me {
        me {
          id
          username
          email
          confirmed
          blocked
          report
          subscribedContent
          subscribedReport
          role {
            id
            name
            type
          }
          metadata
          file {
            data {
              attributes { url }
            }
          }
          image {
            data {
              attributes { url }
            }
          }
          status
          statusComment
        }
      }
    `;
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      next: {
        tags: ['strapi-users-me'],
        // revalidate: 60,
      }
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.error("Failed to fetch data User: ", JSON.stringify(err, null, 2));
      redirect("/logout")
    }
  
    const json = (await res.json()) as {
      data: {
        me: CurrentUserT
      };
    };

    const userResult = CurrentUserT.safeParse(json.data.me);

    if (!userResult.success) {
      console.error("Failed to validate data User: ", JSON.stringify(userResult.error, null, 2));
      redirect("/logout")
    }
  
    return userResult.data;
};