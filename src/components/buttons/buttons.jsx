import './buttons.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addBonus, updateUserInfo } from '../../store/userSclice';
import { appActions } from '../../store/appSlice';

const Buttons = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const updateHandler = (userID) => {
    dispatch(updateUserInfo(userID));
    dispatch(appActions.reset());
  };

  const enterHandler = (userID) => {
    dispatch(addBonus(userID));
    dispatch(appActions.reset());
  };

  const incrementHandler = () => {
    dispatch(appActions.incrementAmount());
  };

  const decrementHandler = () => {
    dispatch(appActions.decrementAmount());
  };

  const resetHandler = () => {
    dispatch(appActions.reset());
  };

  return (
    <div className="btns">
      <button
        className={
          !user.card_id ? 'btn btn--increment disabled' : 'btn btn--increment'
        }
        onClick={incrementHandler}
        disabled={!user.card_id}
      >
        +
      </button>
      <button
        className={
          !user.card_id ? 'btn btn--decrement disabled' : 'btn btn--decrement'
        }
        disabled={!user.card_id}
        onClick={decrementHandler}
      >
        -
      </button>
      <button
        className={!user.card_id ? 'btn btn--enter disabled' : 'btn btn--enter'}
        disabled={!user.card_id}
        onClick={() => dispatch(enterHandler(user.card_id))}
      >
        Enter
      </button>
      <button
        className={!user.card_id ? 'btn btn--reset disabled' : 'btn btn--reset'}
        disabled={!user.card_id}
        onClick={resetHandler}
      >
        Reset
      </button>
      <button
        className={
          !user.card_id ? 'btn btn--fromCard disabled' : 'btn btn--fromCard'
        }
        disabled={!user.card_id}
        onClick={() => dispatch(updateHandler(user.card_id))}
      >
        points
      </button>
    </div>
  );
};

export default Buttons;
