import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryAtom, toDoAtom, toDoSelector } from "../atoms";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import arrowDown from "../resources/arrow-down.png";
import React from "react";

const Container = styled.div`
  max-width: 460px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const H1 = styled.div`
  text-align: center;
  font-size: 32px;
  letter-spacing: 3px;
`;

const InputWrap = styled.div`
  display: flex;
  margin: 30px 0;
  gap: 16px;
`;

const Select = styled.select`
  flex-shrink: none;
  position: relative;
  width: 100px;
  padding: 10px 30px 10px 12px;
  border: none;
  border-radius: 12px;
  background: #fff url(${arrowDown}) no-repeat right 12px center / 14px auto;
  appearance: none;
  font-size: 15px;
  color: #222;
`;

const ResultList = styled.ul`
  margin-top: 10px;
`;

function ToDoPage() {
  const toDoArray = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);

  const chooseCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <H1>TO DO LIST</H1>
      <InputWrap>
        <Select onInput={chooseCategory} value={category}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </Select>
        <ToDoForm />
      </InputWrap>
      <ResultList>
        {toDoArray?.map((toDo) => (
          <ToDoItem key={toDo.id} {...toDo} />
        ))}
      </ResultList>
    </Container>
  );
}

export default ToDoPage;
