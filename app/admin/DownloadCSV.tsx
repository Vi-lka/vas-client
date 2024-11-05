import React from 'react'
import DownloadCSVButton from './DownloadCSVButton'
import { getAllUsers } from '@/lib/queries/getAllUsers';
import type { StatusTranslitEnum } from '@/lib/types/users';
import ErrorHandler from '@/components/errors/ErrorHandler';
import type { MetadataFormT } from '@/lib/types/forms';
import { csvMaker, translitStatusToNormal } from '@/lib/utils';

export default async function DownloadCSV({
    token,
    searchParams,
    className
}: {
    token: string,
    searchParams: { [key: string]: string | string[] | undefined };
    className?: string;
}) {

    const search = searchParams["search"] as string | undefined;
    const sort = searchParams["sort"] as string | undefined;
    const report = searchParams["report"] as string | undefined;
    const confirmed = searchParams["confirmed"] as string | undefined;
    const status = searchParams["status"] as StatusTranslitEnum | undefined;
    const subscribedContent = searchParams["subscribedContent"] as string | undefined;
    const subscribedReport = searchParams["subscribedReport"] as string | undefined;
    const metadata = searchParams["metadata"] as string | undefined;

    const [ dataResult ] = await Promise.allSettled([ 
        getAllUsers({
          token,
          search,
          sort,
          report: report
            ? report === "true" ? true : false
            : undefined,
          confirmed: confirmed
            ? confirmed === "true" ? true : false
            : undefined,
          status,
          subscribedContent: subscribedContent
            ? subscribedContent === "true" ? true : false
            : undefined,
          subscribedReport: subscribedReport
            ? subscribedReport === "true" ? true : false
            : undefined,
          metadata: metadata
            ? metadata === "true" ? true : false
            : undefined,
        }) 
      ]);
      if (dataResult.status === "rejected") return (
        <ErrorHandler 
          error={dataResult.reason as unknown} 
          place="Пользователи"
          notFound={false}
        />
      )

    const objectsToExport = dataResult.value.data.map(item => {
        const data = item.attributes
        const metadata = data.metadata as MetadataFormT | null
        const hasReport = metadata?.report
        const tables = hasReport && metadata.tables.length > 0 ? metadata.tables.map(item => item.value).join(", ") : ""
        const additionalReports = (metadata?.additionalReports && metadata.additionalReports.length > 0) 
            ? metadata.additionalReports.map(item => (
                `Направление: ${item.direction},\n Название доклада: ${item.reportName},\n Тезисы: ${process.env.NEXT_PUBLIC_URL}${item.reportFile?.url}, \n Иллюстрация: ${process.env.NEXT_PUBLIC_URL}${item.imageFile?.url},\n
                `
            )).join("\n\n\n")
            : ""
        
        return {
            "ФИО": data.username,
            "Почта": data.email,
            "Подтвержден Email": data.confirmed ? "Да" : "Нет",
            "С докладом": data.report ? "Да" : "Нет",
            "Статус заявки": translitStatusToNormal(data.status) ?? "",
            "Телефон": metadata?.phone ?? "",
            "Страна": metadata?.country ?? "",
            "Город": metadata?.city ?? "",
            "Ученая степень": hasReport ? metadata.degree : "",
            "Ученое звание": hasReport ? metadata.rank : "",
            "Организация": metadata?.organization ?? "",
            "Должность": hasReport ? metadata.post : "",
            "Формат участия": hasReport ? metadata.format : "",
            "Требуется приглашение": hasReport 
                ? metadata.invitation ? "Да" : "Нет"
                : "",
            "Направление": hasReport ? metadata.direction : "",
            "Название доклада": hasReport ? metadata.reportName : "",
            "Тезисы": (hasReport && metadata.reportFile?.url) ? `${process.env.NEXT_PUBLIC_URL}${metadata.reportFile.url}` : "",
            "Иллюстрация": (hasReport && metadata.imageFile?.url) ? `${process.env.NEXT_PUBLIC_URL}${metadata.imageFile.url}` : "",
            "Доп. доклады": `"${additionalReports}"`,
            "Круглые столы": `"${tables}"`,
            "Комментарии": (hasReport && metadata.comment) ? `"${metadata.comment}"` : "",
            "Email Уведомления (Контент)": data.subscribedContent ? "Да" : "Нет",
            "Email Уведомления (Заявка)": data.subscribedReport ? "Да" : "Нет",
        }
    })
    
    const csvString = csvMaker(objectsToExport)

    return (
        <DownloadCSVButton csvString={csvString} className={className} />
    )
}
