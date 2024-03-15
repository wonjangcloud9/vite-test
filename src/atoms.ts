import { atom } from "recoil";

export const time = atom({
  key: "time",
  default: 1500,
});

export const isRunning = atom({
  key: "isRunning",
  default: false,
});

export const rounds = atom({
  key: "rounds",
  default: 0,
});

export const goal = atom({
  key: "goal",
  default: 12,
});
