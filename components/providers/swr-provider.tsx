'use client';
import React from 'react';
import { SWRConfig } from 'swr'
import request from "graphql-request";

const fetcher = (query: string) =>
    request(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, query);

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SWRConfig
            value={{
                fetcher
            }}
        >
            {children}
        </SWRConfig>
    )
};