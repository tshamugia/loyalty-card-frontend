import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

import Buttons from './components/buttons/buttons';
import CardInput from './components/cardInput/cardInput';
import Cards from './components/cards/cards';
import Display from './components/display/display';
import { getInfoFromDB } from './store/appSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getInfoFromDB());
  }, [user.balance]);

  return (
    <>
      <h1 className="header">Loyalty Card</h1>
      <div className="app">
        <div className="container">
          <Display />
          <Buttons />
          <CardInput />
        </div>
        <div className="card-container">
          <Cards />
        </div>
      </div>
    </>
  );
}

export default App;
