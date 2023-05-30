import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import iconDelete from "../resources/icon-delete.png";

const Item = styled.li`
  margin: 12px 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;

  span {
    display: block;
    padding-top: 10px;
    font-size: 15px;
    line-height: 1.3;
    color: #222;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

  button {
    padding: 3px 6px;
    border: none;
    border-radius: 4px;
    font-size: 12px;

    + button {
    }

    &:disabled {
      background: #ccc;
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

const ButtonDelete = styled.button`
  width: 20px;
  height: 20px;
  margin-left: auto;
  background: url(${iconDelete}) no-repeat center / 15px;
`;

function ToDoItem({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

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

  const deleteTodo = () => {
    setToDos((oldToDos) => {
      return oldToDos.filter((toDo) => toDo.id !== id)
    });
  };

  return (
    <Item>
      <ButtonWrap>
        <ButtonToDo
          name={Categories.TODO}
          onClick={changeCategory}
          disabled={category === Categories.TODO && true}
        >To Do</ButtonToDo>
        <ButtonDoing
          name={Categories.DOING}
          onClick={changeCategory}
          disabled={category === Categories.DOING && true}
        >Doing</ButtonDoing>
        <ButtonDone
          name={Categories.DONE}
          onClick={changeCategory}
          disabled={category === Categories.DONE && true}
        >Done</ButtonDone>
        <ButtonDelete onClick={deleteTodo} aria-label="delete" />
      </ButtonWrap>
      <span>{text}</span>
    </Item>
  );
}

export default ToDoItem;
