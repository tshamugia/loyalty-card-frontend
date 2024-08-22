import { useEffect, useState } from 'react';
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

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getInfoFromDB());
  }, [user.balance]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://3.121.216.13:8080/api/images/', {
          method: 'GET', // or 'POST' if you're sending data
          headers: {
            'Content-Type': 'application/json', // Specify the content type
          },
        });
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          throw new Error('Server Error!');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user.card_id]);



  return (
    <>
      <h1 className="header">Loyalty Card</h1>
      <div className="images-container">
          {loading && <p>Loading images...</p>}
          {error && <p>Error: {error}</p>}
          {images.length > 0 && (
            <div className="images-grid">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.image} // Adjust the property name if necessary
                  alt={image.name}
                  className="image"
                />
              ))}
            </div>
          )}
        </div>
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
