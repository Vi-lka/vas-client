"use server"

import nodemailer from "nodemailer";
import type { ContactFormT } from "@/lib/types/forms";
import { smtpOptions } from "@/lib/email";
import { render } from "@react-email/render";
import { v4 as uuid } from 'uuid';
import EmailContactTemplate from "@/components/emails/EmailContactTemplate";

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
        console.log(error)
        return {
            error: (error as Error).message,
            success: false
        }
    }
}