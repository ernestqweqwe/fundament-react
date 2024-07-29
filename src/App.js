import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import './styles/App.css';
import { AuthContext } from './context';
import { useState } from 'react';
// nfn - снипет стрелочной функции
// usf - useState
// alt + Shift + O - удаляет неиспользуемые импорты

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
