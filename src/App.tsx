import './App.scss';
import AboutModal from './Components/About/AboutModal';
import ContactModal from './Components/Contact/ContactModal';
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';

const App = () => {
  return (
    <>
      <Header />
      <HomePage />
      <AboutModal />
      <ContactModal />
    </>
  );
};

export default App;
