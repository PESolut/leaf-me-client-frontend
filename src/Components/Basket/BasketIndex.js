import {useContextProvider } from '../../Providers/Provider.js'
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from 'react';
import BasketItem from './BasketItem.js';

const BasketIndex = () => {
    const {userID, axios, API, basket, setStoreItems, storeItems} = useContextProvider()
    const [currentBasketItems, setCurrentBasketItems] = useState([])
    const [currentBasketItemsTotalCount, setCurrentBasketItemsTotalCount] = useState(0)
    const [currentBasketItemsTotalUSD, setCurrentBasketItemsTotalUSD] = useState(0)

    // takes in basketItems, and storeItems to calculate total basketItems Price

        const calculateTotalBasketItemsPrice = (basketItems) => {
        let total = 0;
        if (basketItems && storeItems)
        setCurrentBasketItemsTotalCount(basketItems.length)

        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            // console.log('store items dictionary populated')
            setStoreItems(data)
        })

        // console.log('storeitems',storeItems)
      
        for (let i = 0; i < basketItems.length; i++) {
          const { quantity, store_item_id } = basketItems[i];
        //   // Assuming storeItemPrices is a dictionary containing store_item_id as key and price as value
          const price = storeItems[store_item_id-1]
        //   console.log(quantity, store_item_id, price || 0)
        // console.log(price.price)

        //   console.log(storeItems[store_item_id],store_item_id,basketItems[i])

          total += (quantity) * (price.price);

        }
        // console.log(total)
        return total.toFixed(2);
      };

    
    // anytime any basket state changes, fetch store items dictionary
     // fetch all store items and store in dictionary for use in total basket price function
    useEffect(()=>{
        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            // console.log('store items dictionary populated')
            setStoreItems(data)
        })

    },[currentBasketItems, currentBasketItemsTotalCount])

    // take in userID, axios, API state from useContext
    // useEffect w/ userID state as depenecy array
    // on page load or userID change, useEffect will fire
    // need current basket number
    // fetch basket information and render on screen
    
    useEffect(()=> {
        if(basket){
            axios
            .get(`${API}/users/${userID}/basket/${basket[0].id}/storeitems`)
            .then(({data}) => {
                setCurrentBasketItems(data)
            })
            .catch((error) => {
                console.error(error)
            })
        }
    },[userID, basket])

    //on population of state currentBasketItems,
    // fetch the total amunt of basket items, and subtotal
    // render under header

    useEffect(() => {
        if (currentBasketItems.length){
            let basketItemsTotalCount = currentBasketItems.length
            setCurrentBasketItemsTotalCount(basketItemsTotalCount)
            // console.log(currentBasketItemsTotalCount)
            const totalBasketUSD = calculateTotalBasketItemsPrice(currentBasketItems)
            setCurrentBasketItemsTotalUSD(totalBasketUSD)
        }
        
    },[currentBasketItems])

    return (
        <>
        <section className='basket-total-details'>
            <span>{`${currentBasketItemsTotalCount} items`}</span>
            <span>{`Subtotal: $${currentBasketItemsTotalUSD}`}</span>
        </section>
        <div className="basket-index-container">
             {
                    currentBasketItems ? currentBasketItems.map(object =>
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