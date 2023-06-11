import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, ICardGeneral } from "../atoms";
import Card from "./Card";

const BoardWrap = styled.div`
  flex-shrink: 0;
  min-width: 260px;
  max-width: 300px;
  padding: 12px 0;
  border-radius: 8px;
  background-color: #eee;
`;

const Title = styled.h2`
  padding: 4px 12px;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

interface ICardList {
  $isDraggingOver: boolean;
  $isDraggingFrom: boolean;
}

const CardList = styled.div<ICardList>`
  display: flex;
  flex-direction: column;
  padding: 12px 8px 0;
  background-color: ${(props) => props.$isDraggingOver ? "#aec9f2" : props.$isDraggingFrom ? "#d6e1f2" : "none"};
  transition: background-color .3s ease;
`;

const Form = styled.form`
  width: calc(100% - 16px);
  margin: 6px auto 0;

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
  index: number;
}

interface IFormProps {
  cardInput: string;
}

function Board({ boardName, cardContent, index }: IBoardProps) {
  const setBoards = useSetRecoilState(boardState);
  const { register, handleSubmit, setValue } = useForm<IFormProps>();

  const checkValid = ({ cardInput }: IFormProps) => {
    setBoards((orgBoards) => {
      const newCard = {
        id: Date.now(),
        text: cardInput,
      };

      const newBoard = {
        name: orgBoards[index].name,
        items: [...orgBoards[index].items, newCard],
      }

      console.log(...orgBoards, [...orgBoards], newBoard);

      // return {
      //   ...orgCards,
      //   [boardName]: [
      //     ...orgCards[boardName],
      //     newCard,
      //   ],
      // }

      return [
        ...orgBoards.slice(0, index),
      ];
    });

    setValue("cardInput", "");
  };

  return (
    <Draggable draggableId={boardName} index={index}>
      {(provided) => (
        <BoardWrap
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>{boardName}</Title>
          <Droppable droppableId={boardName}>
            {(provided, snapshot) => (
              <CardList
                ref={provided.innerRef}
                {...provided.droppableProps}
                $isDraggingOver={snapshot.isDraggingOver}
                $isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
              >
                {cardContent.map((card, index) => (
                  <Card
                    key={card.id}
                    cardId={card.id}
                    cardText={card.text}
                    index={index}
                    boardName={boardName}
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
      )}
    </Draggable>
  )
}

export default Board;
