import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../atoms";

const CardWrap = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, .03);

  p {
    font-size: 15px;
    line-height: 18px;
  }

  button {
    position: relative;
    width: 18px;
    height: 18px;
    margin-left: auto;
    border-radius: 8px;
    background: #e2e2e2;

    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 4px;
      left: 8px;
      width: 2px;
      height: 10px;
      background: #fff;
    }

    &::after {
      transform: rotate(45deg);
    }

    &::before {
      transform: rotate(-45deg);
    }
  }
`;

interface ICard {
  cardId: number;
  cardText: string;
  index: number;
  boardName: string;
}

function Card({ cardId, cardText, index, boardName }: ICard) {
  const setBoards = useSetRecoilState(boardState);
  const deleteCard = () => {
    setBoards((orgBoards) => {
      const boardIndex = orgBoards.findIndex((board) => board.name === boardName);
      const resultBoards = JSON.parse(JSON.stringify(orgBoards));

      resultBoards[boardIndex].items.splice(index, 1);

      return resultBoards;
    })
  };

  return (
    <Draggable draggableId={cardId + ""} index={index}>
      {(provided) => (
        <CardWrap
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{cardText}</p>
          <button onClick={deleteCard} aria-label="delete"></button>
        </CardWrap>
      )}
    </Draggable>
  )
}

export default React.memo(Card);
