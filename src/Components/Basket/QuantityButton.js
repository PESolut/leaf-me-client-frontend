import React, { useEffect, useState } from 'react';
import { useContextProvider } from '../../Providers/Provider.js';
import './QuantityButton.css';

const QuantityButton = ({ basketItemObject, updateQuantityInBasketItem, removeItemFromBasket }) => {
    const { axios, API , storeItems, userID, basketChange, setBasketChange } = useContextProvider();
    const [quantity, setQuantity] = useState(basketItemObject.quantity);

    useEffect(() => {
        setQuantity(basketItemObject.quantity);
    }, [basketItemObject.quantity]);

    const handleDelete = () => {
        console.log(`${API}/users/${userID}/basket/${basketItemObject.basket_id}/storeitems/${basketItemObject.id}`)
    
        try {
            axios
                .delete(`${API}/users/${userID}/basket/${basketItemObject.basket_id}/storeitems/${basketItemObject.id}`)
                .then(({data}) => {
                    console.log(data)
         
                })
                .catch((error) => {
                    console.error(error)
                })
                removeItemFromBasket(basketItemObject.id);
        } catch (error) {
            console.log(error,'error in quantity button when trying to delete')
        }
    }

    const handleDecrease = () => {
        console.log(`${API}/users/${userID}/basket/${basketItemObject.basket_id}/storeitems/${basketItemObject.id}`)
        if (quantity === 1) {
            return;
        }
    
        try {
            const basketItem = {
                id: basketItemObject.id,
                basket_id: basketItemObject.basket_id,
                store_item_id: basketItemObject.store_item_id,
                quantity: quantity-1
            }
            axios
                .put(`${API}/users/${userID}/basket/${basketItemObject.basket_id}/storeitems/${basketItemObject.id}`, basketItem)
                .then(({data}) => {
                    // console.log(data)
         
                })
                .catch((error) => {
                    console.error(error)
                })
                console.log(basketItemObject.quantity)
                updateQuantityInBasketItem(basketItemObject.id, basketItemObject.quantity - 1);
                setQuantity(prevQuantity => prevQuantity - 1)
                setBasketChange(true)

        } catch (error) {
            console.log(error,'error in quantity button when trying to increase quantity')
        }
    }

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
                    // console.log(data)
         
                })
                .catch((error) => {
                    console.error(error)
                })
                console.log(basketItemObject.quantity)
                updateQuantityInBasketItem(basketItemObject.id, basketItemObject.quantity + 1);
                setQuantity(prevQuantity => prevQuantity + 1)
                setBasketChange(true)
                console.log('basket',basketChange)


        } catch (error) {
            console.log(error,'error in quantity button when trying to increase quantity')
        }
};

  return (
    <div className='quantity-button-container'>
        { quantity <= 1 ? <button onClick={handleDelete} >🗑</button> : <button onClick={handleDecrease}>-</button> }

      {/* <button onClick={handleDecrease}>-</button> */}
      <span>{quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantityButton;
