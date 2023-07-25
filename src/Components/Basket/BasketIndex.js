import {useContextProvider } from '../../Providers/Provider.js'
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from 'react';
import BasketItem from './BasketItem.js';
import './BasketIndex.css'

const BasketIndex = () => {
    const {userID, axios, API, basket, setStoreItems, storeItems} = useContextProvider()
    const [currentBasket, setCurrentBasket] = useState ({
        total: null,
        itemCount: null,
        items: []
    })

    // anytime our user changes or our basket changes, lets update our basketitems
    useEffect(()=> {
        if(basket){
            axios
            .get(`${API}/users/${userID}/basket/${basket[0].id}/storeitems`)
            .then(({data}) => {

                setCurrentBasket({
                    total: currentBasket.total,
                    itemCount: currentBasket.itemCount,
                    items: data
                    
                })
            })
            .catch((error) => {
                console.error(error)
            })
        }
    },[userID, basket])

    // on currentBasketItems change, append total to basket object
    useEffect(()=> {
        if(currentBasket.items.length > 0){
            const total = (calculateTotalBasketItemsPrice(currentBasket.items))
            setCurrentBasket({
                total: `${total}`,
                itemCount: 0,
                items: currentBasket.items
            })
        }
    },[userID, basket, currentBasket.items])

    // takes in basketItems, and storeItems to calculate total basketItems Price
    const calculateTotalBasketItemsPrice =  (basketItems) => {
        if (basketItems.length){
        let total = 0
        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            const storeItems = data
        })
        .catch((error) => {
            console.error(error)
        })
        
        for (let i = 0; i < basketItems.length; i++) {
          const { quantity, store_item_id } = basketItems[i];
          const currentElPrice = storeItems[store_item_id-1].price * quantity
        total += currentElPrice 
        }
        // console.log(total)
        return total.toFixed(2);
        }
      };
    return (
        <>
        <section className='basket-total-container'>
            <span>{`${currentBasket.itemCount} items`}</span>
            <span>{`Subtotal: $${currentBasket.total}`}</span>
        </section>
        <br/>
        <div className="basket-index-container">
             {
                    currentBasket.items ? currentBasket.items.map(object =>
                        <BasketItem
                        key = {uuidv4()}
                        basketItemObject = {object} />
                        ) : <></>
                    
            }
        </div>
        </>
    );
};

export default BasketIndex;