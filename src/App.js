import './App.css';
import Navbar from './components/navbar/Navbar';
import TodoZoznam from './routes/TodoZoznam';
import CreateTodoZoznam from './routes/CreateTodoZoznam';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Zoznam from './routes/[zoznam]';


function App() {
  return (
    <div className="App">
        <BrowserRouter>

          {/* navigacia po stranke */}
          <Navbar />

          <Routes>
            <Route path='/' element={<TodoZoznam />}/>
            <Route path='/:zoznam' element={<Zoznam />}/>
            <Route path='createTodoZoznam' element={<CreateTodoZoznam />}/>
          </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
