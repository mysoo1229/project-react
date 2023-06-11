import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { cardState } from "./atoms";
import Board from "./components/Board";
import Header from "./components/Header";

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 30px 20px;
  align-items: start;
`;

function App() {
  const [boards, setBoards] = useRecoilState(cardState);
  console.log(boards);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === 'board') {
      setBoards((orgBoards) => {
        const resultBoards = [...orgBoards];
        const movingBoard = orgBoards[source.index];

        resultBoards.splice(source.index, 1);
        resultBoards.splice(destination.index, 0, movingBoard);

        console.log(orgBoards, movingBoard, resultBoards);
        return resultBoards;
      })
    } else {
/*       if (destination.droppableId === "trash") {
        setCards((orgCards) => {
          const resultCards = [...orgCards[source.droppableId]];
          resultCards.splice(source.index, 1);

          return {
            ...orgCards,
            [source.droppableId]: resultCards,
          };
        })
      } else {
        if (destination?.droppableId === source.droppableId) {
          setCards((orgCards) => {
            const resultCards = [...orgCards[source.droppableId]];
            const movingCard = resultCards[source.index];

            console.log(resultCards[0]);

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
      } */
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header />
      <Droppable droppableId="container" type="board" direction="horizontal">
        {(provided) => (
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boards?.map((board, index) => (
              <Board
                key={board.name}
                boardName={board.name}
                cardContent={board.items}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App;
