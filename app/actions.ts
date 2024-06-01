/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server"

import nodemailer from "nodemailer";
import type { ContactFormT, NewConfirmRequestFormT, SignUpFormT, PasswordResetFormT, MetadataFormT } from "@/lib/types/forms";
import { smtpOptions } from "@/lib/email";
import { render } from "@react-email/render";
import { v4 as uuid } from 'uuid';
import EmailContactTemplate from "@/components/emails/EmailContactTemplate";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { StrapiErrorT } from '@/types/StrapiError';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { revalidatePath, revalidateTag } from "next/cache";
import type { CurrentUserT } from "@/lib/types/users";

export const signUpAction = async (data: SignUpFormT) => {
  try {
    const strapiResponse = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api/auth/local/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: data.emailAddress, 
          email: data.emailAddress, 
          password: data.password
        }),
        cache: 'no-cache',
      }
    );
  
    // handle strapi error
    if (!strapiResponse.ok) {
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');

      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();

        console.error(JSON.stringify(data, null, 2))
        
        if (data.error.message === 'Email or Username are already taken') {
          throw new Error("Что-то пошло не так.");
        } else {
          throw new Error(data.error.message);
        }
      } else {
        throw new Error(strapiResponse.statusText);
      }
    }
  } catch (error) {
    // network error or something
    throw new Error((error as Error).message ? (error as Error).message : (error as Response).statusText)
  }
}




export const confirmEmailAction = async (confirmationToken: string) => {
  // send email validation request to strapi and wait for the response.
  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/email-confirmation?confirmation=${confirmationToken}`
    );
    // handle strapi error
    if (!strapiResponse.ok) {
      const response = {
        error: true,
        message: '',
      };
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data = await strapiResponse.json();
        response.message = data.error.message;
      } else {
        response.message = strapiResponse.statusText;
      }
      return response;
    }
  } catch (error) {
    // network error or something
    return {
      error: true,
      message: (error as Error).message ? (error as Error).message : (error as Response).statusText,
    };
  }
}




export const confirmationNewRequestAction = async (data: NewConfirmRequestFormT) => {

  const { email } = data

  try {
    const strapiResponse = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api/auth/send-email-confirmation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        cache: 'no-cache',
      }
    );

    // handle strapi error
    if (!strapiResponse.ok) {
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();

        console.error(JSON.stringify(data, null, 2))
        
        if (data.error.message === 'Already confirmed') {
          throw new Error("Что-то пошло не так.");
        } else {
          throw new Error(data.error.message);
        }
      } else {
        throw new Error(strapiResponse.statusText);
      }
    }
  } catch (error) {
    // network error or something
    throw new Error((error as Error).message ? (error as Error).message : (error as Response).statusText)
  }

  redirect('/sign-up/confirmation');
}




export const requestPasswordResetAction = async (data: NewConfirmRequestFormT) => {

  const { email } = data

  try {
    const strapiResponse = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api/auth/forgot-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        cache: 'no-cache',
      }
    );

    // handle strapi error
    if (!strapiResponse.ok) {
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();

        console.error(JSON.stringify(data, null, 2))
        
        throw new Error(data.error.message);
      } else {
        throw new Error(strapiResponse.statusText);
      }
    }
  } catch (error) {
    // network error or something
    throw new Error((error as Error).message ? (error as Error).message : (error as Response).statusText)
  }
}





export const resetPasswordAction = async (data: PasswordResetFormT, code: string) => {

  const { password, passwordConfirmation } = data;

  try {
    const strapiResponse = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api/auth/reset-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          passwordConfirmation,
          code,
        }),
        cache: 'no-cache',
      }
    );


    // handle strapi error
    if (!strapiResponse.ok) {
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();

        console.error(JSON.stringify(data, null, 2))
        
        throw new Error(data.error.message);
      } else {
        throw new Error(strapiResponse.statusText);
      }
    }
  } catch (error) {
    // network error or something
    throw new Error((error as Error).message ? (error as Error).message : (error as Response).statusText)
  }
}



type UpdateUserT = {
  username?: string,
  subscribedContent?: boolean | null,
  subscribedReport?: boolean | null,
  metadata?: MetadataFormT,
  report?: boolean | null,
}
export const updateUserAction = async ({
  username,
  subscribedContent,
  subscribedReport,
  metadata
}: UpdateUserT) => {
  const session = await getServerSession(authOptions);

  try {
    const strapiResponse = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api/user/me',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.strapiToken}`,
        },
        body: JSON.stringify({
          username,
          subscribedContent,
          subscribedReport,
          report: metadata?.report,
          metadata,
        }),
        cache: 'no-cache',
      }
    );

    // handle strapi error
    if (!strapiResponse.ok) {
      // check if response in json-able
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data: StrapiErrorT = await strapiResponse.json();

        console.error(JSON.stringify(data, null, 2))
        
        throw new Error(data.error.message);
      } else {
        throw new Error(strapiResponse.statusText);
      }
    }

    // handle strapi success
    revalidateTag('strapi-users-me');
    revalidatePath('/account')
    revalidatePath('/account/[[...account]]')
    const data: CurrentUserT = await strapiResponse.json();
    return data;

  } catch (error) {
    // network error or something
    throw new Error((error as Error).message ? (error as Error).message : (error as Response).statusText)
  }
}

interface State {
  error: string | null
  success: boolean
}
export const sendEmail = async (prevState: State, formData: ContactFormT) => {
    try {
        const transporter = nodemailer.createTransport({
            ...smtpOptions,
        })
        
        await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to: "vas@sfu-kras.ru",
            subject: 'Обратная связь на сайте "Всероссийский Aрхеологический Cъезд"',
            html: render(EmailContactTemplate(formData)),
            headers: {
              'X-Entity-Ref-ID': uuid(),
            },
        })
        return {
            error: null,
            success: true
        }
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        return {
            error: (error as Error).message,
            success: false
        }
    }
}