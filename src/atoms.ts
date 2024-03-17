import { atom } from "recoil";

export const time = atom({
  key: "time",
  default: 60 * 25 * 1,
});

export const isRunning = atom({
  key: "isRunning",
  default: false,
});

export const rounds = atom({
  key: "rounds",
  default: 0,
});

export const goals = atom({
  key: "goals",
  default: 0,
});
