import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
};
export interface IToDo {
  id: number;
  text: string;
  category: Categories;
};

export const categoryAtom = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

const { persistAtom } = recoilPersist({
  key: "toDoStorage",
  storage: localStorage,
});

export const toDoAtom = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDoArray = get(toDoAtom);
    const category = get(categoryAtom);

    return toDoArray.filter((toDo) => toDo.category === category);
  }
});
