import './css/App.css';
import UnitConverter from './section/UnitConverter.js';
import Todo from './section/Todo.js';

function App() {
  return (
    <div className="App">
      <div className="container">
        <UnitConverter />
        <Todo />
      </div>
    </div>
  );
}

export default App;
