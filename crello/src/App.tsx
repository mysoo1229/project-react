import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cardState } from "./atoms";
import Board from "./components/Board";

const Header = styled.div`
  padding: 10px 20px 0;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 30px 20px;
  align-items: flex-start;
`;

function App() {
  const [cards, setCards] = useRecoilState(cardState);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      setCards((orgCards) => {
        const resultCards = [...orgCards[source.droppableId]];
        const movingCard = resultCards[source.index];

        resultCards.splice(source.index, 1);
        resultCards.splice(destination?.index, 0, movingCard);

        return {
          ...orgCards,
          [source.droppableId]: resultCards
        };
      });
    } else {
      setCards((orgCards) => {
        const sourceCards = [...orgCards[source.droppableId]];
        const destinationCards = [...orgCards[destination.droppableId]];
        const movingCards = sourceCards[source.index];

        sourceCards.splice(source.index, 1);
        destinationCards.splice(destination?.index, 0, movingCards);

        return {
          ...orgCards,
          [source.droppableId]: sourceCards,
          [destination.droppableId]: destinationCards,
        }
      });
    }
  };

  return (
    <>
      <Header>
        <h1>Crello</h1>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {Object.keys(cards).map((boardName) => (
            <Board
              key={boardName}
              boardName={boardName}
              cardContent={cards[boardName]}
            />
          ))}
        </Container>
      </DragDropContext>
    </>
  );
}

export default App;
