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
      items: [
        {id: 1, text: "kimyk"},
        {id: 2, text: "yaki"},
      ],
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
});
