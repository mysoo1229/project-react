import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ICardGeneral {
  id: number;
  text: string;
};

interface ICardState {
  [key: string]: ICardGeneral[];
};

const { persistAtom } = recoilPersist({
  key: "cardStorage",
  storage: localStorage,
});

export const cardState = atom<ICardState>({
  key: "card",
  default: {
    Upcoming: [],
    "In Progress": [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
