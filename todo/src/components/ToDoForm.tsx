import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryAtom, toDoAtom } from "../atoms";

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
  color: #000;
`;

const AddButton = styled.button`
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.accentColor};
  font-size: 15px;
  font-weight: bold;
`;

interface IFormInput {
  toDoInput: string;
};

function ToDoForm() {
  const setToDos = useSetRecoilState(toDoAtom);
  const category = useRecoilValue(categoryAtom);
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const checkValid = ({ toDoInput }: IFormInput) => {
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDoInput, category: category },
      ...oldToDos
    ]);
    setValue("toDoInput", "");
  };

  return (
    <Form onSubmit={handleSubmit(checkValid)}>
      <Input
        {...register("toDoInput", {
          required: "Please write a to-do",
        })}
        placeholder="What To Do?"
      />
      <AddButton>ADD</AddButton>
    </Form>
  );
};

export default ToDoForm;
