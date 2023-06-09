import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { cardState, ICardGeneral } from "../atoms";
import Card from "./Card";

const BoardWrap = styled.div`
  flex-shrink: 0;
  min-width: 260px;
  max-width: 300px;
  padding: 12px 8px;
  border-radius: 8px;
  background-color: #eee;
`;

const Title = styled.h2`
  padding: 4px 4px;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
    border: none;
    padding: 16px 12px;
    border-radius: 8px;
    background-color: #cfcfcf;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, .03);
    font-size: 15px;
  }
`;

interface IBoardProps {
  boardName: string;
  cardContent: ICardGeneral[];
}

interface IFormProps {
  cardInput: string;
}

function Board({ boardName, cardContent }: IBoardProps) {
  const setCards = useSetRecoilState(cardState);
  const { register, handleSubmit, setValue } = useForm<IFormProps>();

  const checkValid = ({ cardInput }: IFormProps) => {
    setCards((orgCards) => {
      const newCard = {
        id: Date.now(),
        text: cardInput,
      };

      return {
        ...orgCards,
        [boardName]: [
          ...orgCards[boardName],
          newCard,
        ],
      }
    });

    setValue("cardInput", "");
  };

  return (
    <BoardWrap>
      <Title>{boardName}</Title>
      <Droppable droppableId={boardName}>
        {(provided) => (
          <CardList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cardContent.map((card, index) => (
              <Card
                key={card.id}
                cardId={card.id}
                cardText={card.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
      <Form onSubmit={handleSubmit(checkValid)}>
        <input
          type="text"
          placeholder="+ add a task"
          {...register("cardInput")}
        />
      </Form>
    </BoardWrap>
  )
}

export default Board;
