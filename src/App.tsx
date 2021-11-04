import { useSelector } from 'react-redux';
import { AppState } from '.';
import './App.scss';
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import Portfolio from './Pages/Portfolio/Portfolio';

const App = () => {
  const tabSelected = useSelector((state: AppState) => state.tabSelected);

  return (
    <>
      <div className="App">
        <div className="content">
          <Header />
          <div className="wrapper">{tabSelected === 'home' ? <HomePage /> : <Portfolio />}</div>
        </div>
      </div>
    </>
  );
};

export default App;
