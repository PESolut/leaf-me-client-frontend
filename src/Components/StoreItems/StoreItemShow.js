import React, { useEffect, useState } from 'react';
import flowerImg from "../../Assets/weedflower2.png";
import defaultImg from "../../Assets/weeddefault.png";
import edibleImg from "../../Assets/weededible.png";
import "./StoreItemShow.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useContextProvider } from '../../Providers/Provider.js';
import { useDisProvider } from "../../Providers/DispensariesProvider";
import { useBasketProvider } from '../../Providers/BasketProvider';

const StoreItemShow = () => {
  const { API, axios, authToken, setAuthToken, userID, setUserID, isSignedIn, setIsSignedIn, addItemToBasket, baskets, setBaskets, basket, basketItems } = useContextProvider();
  const { dispensary_id, store_item_id } = useParams();
  const [dispensaryItem, setDispensaryItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/dispensary/${dispensary_id}/storeitems/${store_item_id}`)
      .then(({ data }) => {
        // console.log('Store Item Index - populated dispensaries items state with API response');
        // console.log(dispensary_id, 'ID');
        setDispensaryItem(data);
      })
      .catch((error) => console.error(error));
  }, [dispensary_id, store_item_id]);

  useEffect(() => {
    const totalPrice = dispensaryItem.price * quantity;
    setTotal(totalPrice.toFixed(2));
  }, [quantity, total]);

  const onAddToBasket = () => {
    addItemToBasket(dispensaryItem.id, quantity, basket, dispensary_id);
    navigate(-1);
  };

  let cardImage = "";

  if (dispensaryItem.type === 'flower') {
    cardImage = flowerImg;
  } else if (dispensaryItem.type === 'edible') {
    cardImage = edibleImg;
  } else {
    cardImage = defaultImg;
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='dcontainer'>
      <img className='dispensary-item-image' src={cardImage} />
      <span className='dispensary-item-details'>{dispensaryItem.name} ({dispensaryItem.type})</span>
      <div className='quantity-form'>
        <label htmlFor='quantity'>{dispensaryItem.type === 'flower' ? <>Grams</> : <>Quantity</>}:</label>
        <div className='quantity-controls'>
          <button onClick={decrementQuantity}>-</button>
          <input
            type='number'
            id='quantity'
            name='quantity'
            min='1'
            value={quantity}
            readOnly
          />
          <button onClick={incrementQuantity}>+</button>
        </div>
      </div>
      <button className="cart" onClick={onAddToBasket}>
        Add {quantity} {dispensaryItem.type === 'flower' ? <>Grams</> : <></>} to Cart (${!isNaN(total) ? <>{total}</> : <>{dispensaryItem.price}</>})
      </button>
    </div>
  );
};

export default StoreItemShow;
