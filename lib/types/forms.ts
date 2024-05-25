import { z } from "zod";

// export const phoneRegex = new RegExp(
//   /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
// );

export const ContactFormT = z.object({
  username: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  email: z.string().email({ message: "Неверно введен Email" }),
  // phone: z.string().regex(phoneRegex, "Неверно введен номер телефона"),
  text: z.string(),
})
export type ContactFormT = z.infer<typeof ContactFormT>;
