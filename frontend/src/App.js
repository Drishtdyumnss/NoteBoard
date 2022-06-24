import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path='/' exact element={<LandingPage />} />
        <Route path='/myNotes' exact element={<MyNotes />} />
        <Route path='/login' exact element={<LoginScreen />} />
        <Route path='/register' exact element={<RegisterScreen />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
