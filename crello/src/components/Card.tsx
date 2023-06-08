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
}

function Card({ cardId, cardText }: ICard) {
  return (
    <CardWrap>
      <p>{cardText}</p>
    </CardWrap>
  );
}

export default Card;
