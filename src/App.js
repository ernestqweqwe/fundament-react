import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import './styles/App.css';
// nfn - снипет стрелочной функции
// usf - useState
// alt + Shift + O - удаляет неиспользуемые импорты

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
