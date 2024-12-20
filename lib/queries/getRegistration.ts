import fetchData from "../fetchData";

const getRegistration = async (): Promise<boolean> => {
  const query = /* GraphGL */ `
    query Registration {
      registration {
        data {
          attributes {
            enabled
          }
        }
      }
    }
  `;

  const json = await fetchData<{
    data: { 
      registration: { 
        data: {
          attributes: { enabled: boolean | null }
        } | null
      } 
    }; 
  }>({
    query, 
    error: "Failed to fetch Registration"
  })
  
  const registration = json.data.registration.data?.attributes.enabled;
  
  return !!registration;
};

export default getRegistration