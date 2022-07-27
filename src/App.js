import './App.css';
import Navbar from './components/navbar/Navbar';
import CreateTodoZoznam from './routes/CreateTodoZoznam';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Zoznam from './routes/[zoznam]';
import { useCallback, useState } from 'react';


function App() {

  // helper aby sa dal updatnut navbar
  const [change, setChange] = useState(true);

  const handleChange = useCallback(() => {
    setChange(prev => !prev);
  },[]);

  return (
    <div className="App">
        <BrowserRouter>

          {/* navigacia po stranke */}
          <Navbar change={change}/>

          <Routes>
            <Route path='/' element={<CreateTodoZoznam />}/>
            <Route path='/:zoznam' element={<Zoznam handleChange={handleChange}/>}/>
            <Route path='createTodoZoznam' element={<CreateTodoZoznam handleChange={handleChange}/>}/>
          </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
