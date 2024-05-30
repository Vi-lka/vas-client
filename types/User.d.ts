export type StrapiUserT = {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  report: boolean | null;
  provider: 'credentials';
};

export type StrapiLoginResponseT = {
  jwt: string;
  user: StrapiUserT;
};