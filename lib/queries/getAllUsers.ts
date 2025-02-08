"use server"

import { notFound } from "next/navigation"
import fetchData from "../fetchData"
import type { StatusTranslitEnum } from "../types/users";
import { UsersT } from "../types/users"
import type { MetadataFormT } from "../types/forms";

export const getAllUsers = async ({
    token,
    page = 1,
    pageSize,
    report,
    confirmed,
    status,
    subscribedContent,
    subscribedReport,
    metadata,
    search,
    file,
    image,
    sort
}: {
    token: string,
    page?: number;
    pageSize?: number;
    report?: boolean;
    confirmed?: boolean;
    status?: StatusTranslitEnum;
    subscribedContent?: boolean;
    subscribedReport?: boolean;
    metadata?: boolean;
    search?: string;
    file?: boolean;
    image?: boolean;
    sort?: string
}): Promise<UsersT> => {
    const query = /* GraphGL */ `
        query getAllUsers($filters: UsersPermissionsUserFiltersInput, $pagination: PaginationArg, $sort: [String]) {
          usersPermissionsUsers(filters: $filters, pagination: $pagination, sort: $sort) {
            meta {
              pagination {
                total
              }
            }
            data {
              id
              attributes {
                username
                email
                confirmed
                blocked
                report
                status
                statusComment
                subscribedContent
                subscribedReport
                role {
                  data {
                    id
                    attributes {
                      type
                      name
                    }
                  }
                }
                metadata
                file {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                createdAt
              }
            }
          }
        }
    `

    const json = await fetchData<{ 
        data: { 
          usersPermissionsUsers: UsersT
        }; 
    }>({ 
        query, 
        error: "Failed to fetch All Users",
        token,
        cache: 'no-store',
        variables: {
            // pagination: { page, pageSize },
            sort,
            filters: {
                role: {
                  name: { ne: "Admin" }
                },
                report: (report !== undefined) ? {
                    eq: report
                } : undefined,
                confirmed: (confirmed !== undefined) ? {
                    eq: confirmed
                } : undefined,
                status: (status !== undefined) ? {
                    eq: status
                } : undefined,
                subscribedContent: (subscribedContent !== undefined) ? {
                    eq: subscribedContent
                } : undefined,
                subscribedReport: (subscribedReport !== undefined) ? {
                    eq: subscribedReport
                } : undefined,
                metadata: (metadata !== undefined) ? {
                    notNull: metadata
                } : undefined,
                and: [
                  {
                    username: {
                      containsi: search ? `${search}`: ""
                    }
                  }
                ]
            }
        }
    })
    
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    
    if (json.data.usersPermissionsUsers.meta.pagination.total === 0) notFound();

    const allUsers = UsersT.parse(json.data.usersPermissionsUsers);

    const filteredByFileUsers = allUsers.data.filter(user => {
      const fileUrl = (user.attributes.metadata as MetadataFormT | null)?.reportFile?.url
      if ((file === true)) {
        if (fileUrl) return fileUrl.length > 0;
        else return false;
      }
      if (file === false) {
        if (fileUrl) return fileUrl.length < 1;
        else return true;
      }
      return true;
    })

    const filteredByImageUsers = filteredByFileUsers.filter(user => {
      const imageUrl = (user.attributes.metadata as MetadataFormT | null)?.imageFile?.url
      if ((image === true)) {
        if (imageUrl) return imageUrl.length > 0;
        else return false;
      }
      if (image === false) {
        if (imageUrl) return imageUrl.length < 1;
        else return true;
      }
      return true;
    })

    const paginatedUsers = pageSize 
      ? filteredByImageUsers.slice((page - 1) * pageSize, page * pageSize)
      : filteredByImageUsers

    const resUsers = {
      meta: {
        pagination: {
          total: filteredByImageUsers.length
        }
      },
      data: paginatedUsers
    }
    
    return resUsers
}