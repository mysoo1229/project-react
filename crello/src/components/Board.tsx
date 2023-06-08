import styled from "styled-components";
import { ICardGeneral } from "../atoms";
import Card from "./Card";

const BoardWrap = styled.div`
  flex-shrink: 0;
  min-width: 260px;
  max-width: 300px;
  padding: 12px 8px;
  border-radius: 8px;
  background-color: #ddd;
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
  gap: 8px;
  padding-top: 10px;
`;

interface IBoardProps {
  boardName: string;
  cardContent: ICardGeneral[];
}

function Board({ boardName, cardContent }: IBoardProps) {
  return (
    <BoardWrap>
      <Title>{boardName}</Title>
      <CardList>
        {cardContent?.map((card, index) => (
          <Card
            key={index}
            cardId={card.id}
            cardText={card.text}
          />
        ))}
      </CardList>
    </BoardWrap>
  )
}

export default Board;
