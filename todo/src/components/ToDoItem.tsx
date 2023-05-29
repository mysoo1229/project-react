import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoAtom } from "../atoms";

const Item = styled.li`
  display: flex;
  gap: 16px;
  margin: 12px 0;
  align-items: center;
`;

const ButtonWrap = styled.div`
  width: 100px;

  button {
    width: 48px;
    padding: 3px 0;
    border: none;
    border-radius: 4px;
    font-size: 12px;

    + button {
      margin-left: 4px;
    }
  }
`;

const ButtonToDo = styled.button`
  background: #ff6262;
`;

const ButtonDoing = styled.button`
  background: #deb034;
`;

const ButtonDone = styled.button`
  background: #3bb98b;
`;

function ToDoItem({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoAtom);

  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;

    setToDos((oldToDos) => {
      const clickedIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const clickedToDo = {id, text, category: name as any};

      return [
        ...oldToDos.slice(0, clickedIndex),
        clickedToDo,
        ...oldToDos.slice(clickedIndex + 1)
      ];
    });
  };

  return (
    <Item>
      <ButtonWrap>
        { category !== Categories.TO_DO && <ButtonToDo name={Categories.TO_DO} onClick={changeCategory}>To Do</ButtonToDo> }
        { category !== Categories.DOING && <ButtonDoing name={Categories.DOING} onClick={changeCategory}>Doing</ButtonDoing> }
        { category !== Categories.DONE && <ButtonDone name={Categories.DONE} onClick={changeCategory}>Done</ButtonDone> }
      </ButtonWrap>
      <span>{text}</span>
    </Item>
  );
}

export default ToDoItem;
