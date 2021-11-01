import './App.scss';
import AboutModal from './Components/About/AboutModal';
import ContactModal from './Components/Contact/ContactModal';
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';

const App = () => {
  return (
    <>
      <div className="App">
        <div className="content">
          <Header />
          <HomePage />
        </div>
        <AboutModal />
        <ContactModal />
      </div>
    </>
  );
};

export default App;
