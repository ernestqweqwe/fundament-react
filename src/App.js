import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './styles/App.css';
import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar/Navbar';
import Error from './pages/Error';
// nfn - снипет стрелочной функции
// usf - useState
// alt + Shift + O - удаляет неиспользуемые импорты

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="/*" element={<Navigate to="/error" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
