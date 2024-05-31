import { z } from "zod";

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const ContactFormT = z.object({
  username: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  email: z.string().email({ message: "Неверно введен Email" }),
  // phone: z.string().regex(phoneRegex, "Неверно введен номер телефона"),
  text: z.string(),
})
export type ContactFormT = z.infer<typeof ContactFormT>;




export const SignInFormT = z.object({
  identifier: z.string().email({ message: "Неверно введен Email" }),
  password: z.string().min(8, {
    message: "Введите не менее 8 символов",
  }),
})
export type SignInFormT = z.infer<typeof SignInFormT>;




export const SignUpFormT = z.object({
  emailAddress: z.string().email({ message: "Неверно введен Email" }),
  password: z.string().min(8, {
    message: "Введите не менее 8 символов",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Введите не менее 8 символов",
  }),
}).superRefine(({ password, passwordConfirmation }, ctx) => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch: string) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
  let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
  for (let i = 0; i < password.length; i++) {
    const ch = password.charAt(i);
    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }
  if (countOfLowerCase < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 символа в нижнем регистре",
      path: ['password']
    });
  }
  if (countOfUpperCase < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 символа в верхнем регистре",
      path: ['password']
    });
  }
  if (countOfSpecialChar < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 спец. символа: !?@#$%&*^`'\"+=-~_(){}[]<>:;|\\/",
      path: ['password']
    });
  }
  if (countOfNumbers < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 цифры",
      path: ['password']
    });
  }
  if (password !== passwordConfirmation) {
    ctx.addIssue({
      code: "custom",
      message: "Пароли не совпадают",
      path: ['passwordConfirmation']
    });
  }
});
export type SignUpFormT = z.infer<typeof SignUpFormT>;




export const NewConfirmRequestFormT = z.object({
  email: z.string().email({ message: "Неверно введен Email" }),
})
export type NewConfirmRequestFormT = z.infer<typeof NewConfirmRequestFormT>;




export const PasswordResetFormT = z.object({
  password: z.string().min(8, {
    message: "Введите не менее 8 символов",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Введите не менее 8 символов",
  }),
}).superRefine(({ password, passwordConfirmation }, ctx) => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch: string) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
  let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
  for (let i = 0; i < password.length; i++) {
    const ch = password.charAt(i);
    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }
  if (countOfLowerCase < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 символа в нижнем регистре",
      path: ['password']
    });
  }
  if (countOfUpperCase < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 символа в верхнем регистре",
      path: ['password']
    });
  }
  if (countOfSpecialChar < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 спец. символа: !?@#$%&*^`'\"+=-~_(){}[]<>:;|\\/",
      path: ['password']
    });
  }
  if (countOfNumbers < 1) {
    ctx.addIssue({
      code: "custom",
      message: "Пароль должен содержать не менее 1 цифры",
      path: ['password']
    });
  }
  if (password !== passwordConfirmation) {
    ctx.addIssue({
      code: "custom",
      message: "Пароли не совпадают",
      path: ['passwordConfirmation']
    });
  }
});
export type PasswordResetFormT = z.infer<typeof PasswordResetFormT>;




export const MetadataNoReportFormT = z.object({
  report: z.literal(false),
  familyName: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  name: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  middleName: z.string(),
  phone: z.string().regex(phoneRegex, "Неверно введен номер телефона"),
  country: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  city: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  organization: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  reportFile: z.object({
    file: z.custom<File>().nullable().optional().superRefine((file, ctx) => {
      if (file && (file.size > 5 * 1024 * 1024)) {
        ctx.addIssue({
          code: "custom",
          message: "Размер файла должен быть не более 5МБ",
          path: ['file']
        });
      }
    }),
    url: z.string()
  }).optional()
})
export type MetadataNoReportFormT = z.infer<typeof MetadataNoReportFormT>;




export const FormatEnum = z.enum(
  ["очно", "дистанционно", "стендовый доклад"], 
  {required_error: "Это поле является обязательным"}
);
export type FormatEnum = z.infer<typeof FormatEnum>;


export const MetadataReportFormT = z.object({
  report: z.literal(true),
  familyName: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  name: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  middleName: z.string(),
  phone: z.string().regex(phoneRegex, "Неверно введен номер телефона"),
  country: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  city: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  degree: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  rank: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  organization: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  post: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  format: FormatEnum,
  direction: z.string({
    required_error: "Это поле является обязательным"
  }),
  reportName: z.string().min(2, {
    message: "Введите не менее 2х символов",
  }),
  reportFile: z.object({
    file: z.custom<File>().nullable().optional().superRefine((file, ctx) => {
      if (file && (file.size > 5 * 1024 * 1024)) {
        ctx.addIssue({
          code: "custom",
          message: "Размер файла должен быть не более 5МБ",
          path: ['file']
        });
      }
    }),
    url: z.string()
  }).optional(),
  tables: z.object({
    label: z.string(),
    value: z.string(),
  }).array(),
  tour: z.string(),
  invitation: z.boolean({
    required_error: "Это поле является обязательным"
  }),
  comment: z.string()
})
export type MetadataReportFormT = z.infer<typeof MetadataReportFormT>;


export const MetadataFormT = z.discriminatedUnion( 'report', [
  MetadataNoReportFormT,
  MetadataReportFormT
])
export type MetadataFormT = z.infer<typeof MetadataFormT>;

export const AbstractsFormT = z.object({
  reportFile: z.object({
    file: z.custom<File>().nullable().optional().superRefine((file, ctx) => {
      if (file && (file.size > 5 * 1024 * 1024)) {
        ctx.addIssue({
          code: "custom",
          message: "Размер файла должен быть не более 5МБ",
          path: ['file']
        });
      }
    }),
    url: z.string()
  }).optional(),
})


