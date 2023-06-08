import { atom } from "recoil";

export interface ICardGeneral {
  id: number;
  text: string;
};

interface ICardState {
  [key: string]: ICardGeneral[];
};

export const cardState = atom<ICardState>({
  key: "card",
  default: {
    Upcoming: [{id: 1, text: "fenerbahce"}, {id: 2, text: "eczacibasi"}],
    "In Progress": [],
    Done: [],
  }
});
