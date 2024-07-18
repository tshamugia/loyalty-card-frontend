import './cards.scss';

import { useSelector } from 'react-redux';

const Cards = () => {
  const usersInfo = useSelector((state) => state.app.users);
  return (
    <div className="cards">
      <div className="cards__title">
        <h4>CARD ID</h4>
        <h4>POINTS</h4>
      </div>
      {usersInfo.map((user) => (
        <div className="cards__info" key={user.uid}>
          <span className="cards__info--id">{user.card_id}</span>
          <span className="cards__info--pints">
            {user.balance.toFixed(2)} gel
          </span>
        </div>
      ))}
    </div>
  );
};

export default Cards;
