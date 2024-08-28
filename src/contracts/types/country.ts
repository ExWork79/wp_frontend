import { Population } from "./population";

export type Country = {
  _id: string;
  name: string;
  cca2: string;
  cca3: string;
  unMember: boolean;
  area: number;
  landArea: number;
  populations?: Population[];
  flag?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};
