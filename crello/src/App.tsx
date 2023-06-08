import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
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
  const cardArray = useRecoilValue(cardState);
  const onDragEnd = () => {

  };

  return (
    <>
      <Header>
        <h1>Crello</h1>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {Object.keys(cardArray).map((boardName) => (
            <Board
              key={boardName}
              boardName={boardName}
              cardContent={cardArray[boardName]}
            />
          ))}
        </Container>
      </DragDropContext>
    </>
  );
}

export default App;
