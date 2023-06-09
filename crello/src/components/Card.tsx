import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardWrap = styled.div`
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: #f5f5f5;

  p {
    font-size: 15px;
  }
`;

interface ICard {
  cardId: number;
  cardText: string;
  index: number;
}

function Card({ cardId, cardText, index }: ICard) {
  return (
    <Draggable draggableId={cardId + ""} index={index}>
      {(provided) => (
        <CardWrap
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {cardText}
        </CardWrap>
      )}
    </Draggable>
  )
}

export default React.memo(Card);
