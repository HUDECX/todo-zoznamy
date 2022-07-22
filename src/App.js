import './App.css';
import Navbar from './components/navbar/Navbar';
import TodoZoznam from './routes/TodoZoznam';
import CreateTodoZoznam from './routes/CreateTodoZoznam';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        {/* navigacia po stranke */}
        <Navbar />

        <Routes>
          <Route path='/' element={<TodoZoznam />}/>
          <Route path='createTodoZoznam' element={<CreateTodoZoznam />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
