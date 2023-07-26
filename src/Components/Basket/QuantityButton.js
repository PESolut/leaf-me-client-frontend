import React, { useEffect, useState } from 'react';
import { useContextProvider } from '../../Providers/Provider.js';

const QuantityButton = ({ basketItemObject, updateQuantityInBasketItem }) => {
    const { axios, API , storeItems, userID } = useContextProvider();
    const [quantity, setQuantity] = useState(basketItemObject.quantity);

    useEffect(() => {
        setQuantity(basketItemObject.quantity);
    }, [basketItemObject.quantity]);

    const handleDecrease = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
};

    const handleIncrease = () => {
        console.log(`${API}/users/${userID}/basket/${basketItemObject.basket_id}/storeitems/${basketItemObject.id}`)
    
        try {
            const basketItem = {
                id: basketItemObject.id,
                basket_id: basketItemObject.basket_id,
                store_item_id: basketItemObject.store_item_id,
                quantity: quantity+1
            }
            axios
                .put(`${API}/users/${userID}/basket/${basketItemObject.basket_id}/storeitems/${basketItemObject.id}`, basketItem)
                .then(({data}) => {
                    console.log(data)
         
                })
                .catch((error) => {
                    console.error(error)
                })
                console.log(basketItemObject.quantity)
                updateQuantityInBasketItem(basketItemObject.id, basketItemObject.quantity + 1);
                setQuantity(prevQuantity => prevQuantity + 1)

        } catch (error) {
            console.log(error,'error in quantity button when trying to increase quantity')
        }
};

  return (
    <div className='quantity-button-container'>
      <button onClick={handleDecrease}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantityButton;
