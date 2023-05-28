import styled from "styled-components";
import arrowDown from "../resources/arrow-down.png";

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

const Form = styled.form`
  flex: 1;
  display: flex;
  gap: 4px;
  background: #fff;
  border-radius: 12px;
  padding: 2px;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 12px;
  border: none;
  border-radius: 10px;
  background: none;
`;

const AddButton = styled.button`
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.accentColor};
  font-size: 15px;
  font-weight: bold;
`;

const ResultList = styled.ul`
  margin-top: 10px;
`;

const Item = styled.li`
  display: flex;
  gap: 16px;
  margin: 12px 0;
  align-items: center;
`;

const Buttons = styled.div`
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

const ButtoDoing = styled.button`
  background: #deb034;
`;

const ButtonDone = styled.button`
  background: #3bb98b;
`;

function ToDoPage() {
  return (
    <Container>
      <H1>TO DO LIST</H1>
      <InputWrap>
        <Select>
          <option>To Do</option>
          <option>Doing</option>
          <option>Done</option>
        </Select>
        <Form>
          <Input />
          <AddButton>ADD</AddButton>
        </Form>
      </InputWrap>
      <ResultList>
        <Item>
          <Buttons>
            <ButtonToDo>To Do</ButtonToDo>
            <ButtoDoing>Doing</ButtoDoing>
          </Buttons>
          <span>To Do Example</span>
        </Item>
        <Item>
          <Buttons>
            <ButtoDoing>Doing</ButtoDoing>
            <ButtonDone>Done</ButtonDone>
          </Buttons>
          <span>Another To Do Example</span>
        </Item>
      </ResultList>
    </Container>
  );
}

export default ToDoPage;
