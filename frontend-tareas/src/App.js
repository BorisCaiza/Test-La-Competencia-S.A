import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrateTask from './Pages/CrateTask';
import EditTask from './Pages/EditTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create" element={<CrateTask />} />
        <Route path="/edit/:id" element={<EditTask />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
