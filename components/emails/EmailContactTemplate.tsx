import type { ContactFormT } from "@/lib/types/forms";
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

export const EmailContactTemplate = ({
  username,
  email,
  text
}: ContactFormT) => {
  const previewText = `Запрос на Сайте "Всероссийский Aрхеологический Cъезд"`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/vas-logo.png`}
                width="120"
                height="120"
                alt="Icon"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[20px] font-normal text-center p-0 my-[30px] mx-0">
              {`Запрос на cайте "Всероссийский Aрхеологический Cъезд"`}
            </Heading>
            <Text className="text-black text-[16px]">
              ФИО: {username}
            </Text>
            <Text className="text-black text-[16px]">
              Email: {" "}
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 no-underline"
              >
                {email}
              </Link>
            </Text>
            <Markdown>
              {`**Текст**: ${text}`}
            </Markdown>
            {/* <Text>
              Текст: {text}
            </Text> */}
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailContactTemplate.PreviewProps = {
  username: "Alan Turing",
  email: "alan.turing@example.com",
  phone: "+7 999 999-99-99",
  text: "Alan Turing send you message"
} as ContactFormT;

export default EmailContactTemplate;