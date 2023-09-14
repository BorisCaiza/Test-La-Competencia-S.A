import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrateTask from './Pages/CrateTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create" element={<CrateTask />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
