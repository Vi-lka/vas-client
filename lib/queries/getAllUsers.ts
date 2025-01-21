"use server"

import { notFound } from "next/navigation"
import fetchData from "../fetchData"
import type { StatusTranslitEnum } from "../types/users";
import { UsersT } from "../types/users"

export const getAllUsers = async ({
    token,
    page,
    pageSize,
    report,
    confirmed,
    status,
    subscribedContent,
    subscribedReport,
    metadata,
    search,
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
            pagination: { page, pageSize },
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

    return allUsers
}