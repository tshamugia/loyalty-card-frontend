import './cardInput.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getUserInfo } from '../../store/userSclice';

const CardInput = () => {
  const [userCard, setUserCard] = useState('');

  const dispatch = useDispatch();

  const findUser = (userID) => {
    dispatch(getUserInfo(userID));
    setUserCard('');
  };

  const handleCardInput = (e) => {
    
    setUserCard(e.target.value);
  };

  return (
    <div className="card">
      <span className="card__title">card ID:</span>

      <input
        type="text"
        name="cardID"
        value={userCard}
        onChange={handleCardInput}
      />
      <button
        className={!userCard ? 'btn disabled' : 'btn'}
        disabled={!userCard}
        type="submit"
        onClick={() => dispatch(findUser(userCard))}
      >
        find
      </button>
    </div>
  );
};

export default CardInput;
