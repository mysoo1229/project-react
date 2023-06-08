import styled from "styled-components";

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
`;

const Board = styled.div`
  flex-shrink: 0;
  min-width: 260px;
  max-width: 300px;
  padding: 12px 8px;
  border-radius: 8px;
  background-color: #ddd;
`;

const Title = styled.h2`
  padding: 4px 4px;
  font-size: 18px;
  font-weight: bold;
`;

const Cards = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Card = styled.div`
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: #f5f5f5;

  p {
    font-size: 15px;
  }
`;

function App() {
  return (
    <>
      <Header>
        <h1>Crello</h1>
      </Header>
      <Container>
        <Board>
          <Title>Upcoming</Title>
          <Cards>
            <Card>
              <p>Plan marketing campaign</p>
            </Card>
          </Cards>
        </Board>
        <Board>
          <Title>Upcoming</Title>
          <Cards>
            <Card>
              <p>Plan marketing campaign</p>
            </Card>
          </Cards>
        </Board>
        <Board>
          <Title>Upcoming</Title>
          <Cards>
            <Card>
              <p>Plan marketing campaign</p>
            </Card>
          </Cards>
        </Board>
      </Container>
    </>
  );
}

export default App;
