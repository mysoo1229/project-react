import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IToDo } from "../atoms";

const Item = styled.li`
  display: flex;
  gap: 16px;
  margin: 12px 0;
  align-items: center;
`;

function ToDoItem({ text }: IToDo) {
  return (
    <Item>
      <span>{text}</span>
    </Item>
  );
}

export default ToDoItem;
