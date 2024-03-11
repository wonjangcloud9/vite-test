import { atom } from "recoil";

export interface Country {
  name: string;
  type: string;
}

const countriesState = atom<Country[]>({
  key: "countriesState",
  default: [],
});
