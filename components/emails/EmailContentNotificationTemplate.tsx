import type { ContentNotificationFormT } from "@/lib/types/forms";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Markdown,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}`
  : "https://vas.sfu-kras.ru";

export const EmailContentNotificationTemplate = ({
  text
}: ContentNotificationFormT) => {
  const previewText = `VII (XXIII) Всероссийский Aрхеологический Cъезд`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px] overflow-hidden">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/vas-logo.png`}
                width="120"
                height="120"
                alt="Icon"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading as="h1" className="text-black text-[20px] font-extrabold tracking-tighter text-center p-0 mt-[30px] mb-[6px] mx-0 leading-5">
                VII (XXIII) Всероссийский <strong className="font-extrabold text-orange-500 block leading-5">Aрхеологический Cъезд</strong>
            </Heading>
            {/* <Heading as="h2" className="text-black text-[18px] font-normal text-center p-0 mb-[30px] mx-0">
              Изменения на cайте:
            </Heading> */}
            <div className="prose prose-base prose-headings:text-foreground prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
              <Markdown markdownContainerStyles={{paddingInline: "8px"}}>
                {`${text}`}
              </Markdown>
            </div>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-gray-700 text-[12px] leading-4">
                Вы получили это сообщение, потому что подписаны на рассылку о новых материалах, изменениях в программе или направлениях и др.
            </Text>
            <Text className="text-gray-700 text-[12px] leading-4">
                Чтобы отключить рассылку {" "}
                <Link
                  href={`${baseUrl}/account`}
                  className="text-blue-600 no-underline"
                >
                  Перейдите в профиль ↗
                </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailContentNotificationTemplate.PreviewProps = {
  text: "Alan Turing send you message"
} as ContentNotificationFormT;

export default EmailContentNotificationTemplate;