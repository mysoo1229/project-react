import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryAtom, toDoAtom, toDoSelector } from "../atoms";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
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

const TabWrap = styled.div`
  display: flex;
  margin: 30px 0 12px;
  padding: 2px;
  border-radius: 12px;
  background: #fff;

  button {
    flex: 1;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    background: none;
    font-size: 15px;
    color: #999;

    &:disabled {
      background: ${(props) => props.theme.accentColor};
      box-shadow: 0 0 7px 3px rgba(0, 0, 0, .15);
      font-weight: bold;
      color: #fff;
    }
  }
`;

const ResultList = styled.ul`
  margin-top: 30px;
`;

function ToDoPage() {
  const toDoArray = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);

  const chooseCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.name as any);
  };

  return (
    <Container>
      <H1>TO DO LIST</H1>
      <TabWrap>
        <button
          onClick={chooseCategory}
          name={Categories.TODO}
          disabled={category === Categories.TODO && true}
        >TO DO</button>
        <button
          onClick={chooseCategory}
          name={Categories.DOING}
          disabled={category === Categories.DOING && true}
        >DOING</button>
        <button
          onClick={chooseCategory}
          name={Categories.DONE}
          disabled={category === Categories.DONE && true}
        >DONE</button>
      </TabWrap>
      <ToDoForm />
      <ResultList>
        {toDoArray?.map((toDo) => (
          <ToDoItem key={toDo.id} {...toDo} />
        ))}
      </ResultList>
    </Container>
  );
}

export default ToDoPage;
