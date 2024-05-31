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
          subscribed
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
      console.error(JSON.stringify(err, null, 2));
      // Throw an error
      throw new Error("Failed to fetch data User");
    }
  
    const json = (await res.json()) as {
      data: {
        me: CurrentUserT
      };
    };

    const data = CurrentUserT.parse(json.data.me);
  
    return data;
};