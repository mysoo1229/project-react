import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
};

export const toDoAtom = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
