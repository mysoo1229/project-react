import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoAtom } from "../atoms";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";

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

const ResultList = styled.ul`
  margin-top: 10px;
`;

function ToDoPage() {
  const toDoArray = useRecoilValue(toDoAtom);

  return (
    <Container>
      <H1>TO DO LIST</H1>
      <InputWrap>
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
