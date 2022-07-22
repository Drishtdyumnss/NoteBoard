import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path='/' exact element={<LandingPage />} />
        <Route path='/myNotes' element={<MyNotes />} />
        <Route path='/createnote' element={<CreateNote />} />
        <Route path='/note/:id' element={<SingleNote />} />
        <Route path='/login' exact element={<LoginScreen />} />
        <Route path='/register' exact element={<RegisterScreen />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
