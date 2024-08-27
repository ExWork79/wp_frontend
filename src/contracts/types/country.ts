export type Country = {
  _id: string;
  name: string;
  cca2: string;
  cca3: string;
  unMember: boolean;
  area: number;
  landArea: number;
  flag?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};
