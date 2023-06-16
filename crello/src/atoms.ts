import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ICardGeneral {
  id: number;
  text: string;
};

interface IBoardState {
  name: string;
  items: ICardGeneral[];
};

const { persistAtom } = recoilPersist({
  key: "cardStorage",
  storage: localStorage,
});

export const boardState = atom<IBoardState[]>({
  key: "board",
  default: [
    {
      name: "Upcoming",
      items: [],
    },
    {
      name: "In Progress",
      items: [],
    },
    {
      name: "Done",
      items: [],
    }
  ],
  effects_UNSTABLE: [persistAtom],
});
