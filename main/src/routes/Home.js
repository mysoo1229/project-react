import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <div className="container home">
        <h1>저의 귀여운<br />React 연습 프로젝트를<br />보여드립니다.</h1>
        <div className="project-content">
          <div className="project-each">
            <Link to="/project-react/movie">
              <h2>영화 리스트</h2>
            </Link>
          </div>
          <div className="project-each">
            <Link to="/project-react/basic">
              <h2>간단 연습</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
