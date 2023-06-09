import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardWrap = styled.div`
  width: 100%;
  margin-bottom: 12px;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, .03);

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
