import React from 'react';
import { useSelector } from 'react-redux';
import './display.scss';

const Display = () => {
  const items = useSelector((state) => state.app.items);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="display">
      <div className="display__user">
        <span className="display__user--id">userID: {user.card_id}</span>
        <span className="display__user--points">{user.balance} gel</span>
      </div>

      <div className="display__info">
        <span className="display__info--title">Price:</span>
        <span className="display__info--digit">{items.price}</span>
      </div>

      <div className="display__info">
        <span className="display__info--title">Bonus:</span>
        <span className="display__info--digit">{items.bonus}</span>
      </div>

      <div className="display__info">
        <span className="display__info--title">Amount:</span>
        <span className="display__info--digit">{items.amount}</span>
      </div>

      <div className="display__info">
        <span className="display__info--title">Cube:</span>
        <span className="display__info--digit">{items.cube}</span>
      </div>
    </div>
  );
};

export default Display;
