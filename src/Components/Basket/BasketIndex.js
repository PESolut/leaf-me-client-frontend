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

        // console.log(currentBasket)
        // console.log(total)
    },[userID, basket])

    // on currentBasketItems change, append total to object
    useEffect(()=> {

        if(currentBasket.items.length > 1){
            const total = (calculateTotalBasketItemsPrice(currentBasket.items))
            setCurrentBasket({
                total: `${total}`,
                itemCount: 0,
                items: currentBasket.items
                
            })
            // console.log(total)
            // console.log(currentBasket)

        }
        // console.log(currentBasket)
        // console.log (calculateTotalBasketItemsPrice(currentBasket))
        //figure out our total basket price store in our state
        // console.log('calculating total',totalPrice)
    },[userID, basket, currentBasket.items])

    // takes in basketItems, and storeItems to calculate total basketItems Price

    const calculateTotalBasketItemsPrice =  (basketItems) => {
        if (basketItems.length){
        let total = 0
        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            // console.log('store items dictionary populated')
            const storeItems = data
        })
        
        // console.log(basketItems,storeItems)

        for (let i = 0; i < basketItems.length; i++) {
        // console.log(basketItems)
          const { quantity, store_item_id } = basketItems[i];
        //   console.log(storeItems[store_item_id-1].price)
        // console.log(quantity)
        // console.log(storeItems[store_item_id-1].price * quantity)
          const currentElPrice = storeItems[store_item_id-1].price * quantity
        //   console.log(price.price)
        total += currentElPrice 
        //   total += (quantity) * (price.price);
        }
        // console.log(total)
        return total.toFixed(2);
        }
      };

    //     const calculateTotalBasketItemsPrice = (basketItems) => {
    //     let total = 0;
    //     if (basketItems && storeItems)
    //     setCurrentBasketItemsTotalCount(basketItems.length)

    //     axios
    //     .get(`${API}/allstoreitems`)
    //     .then(({data}) => {
    //         // console.log('store items dictionary populated')
    //         setStoreItems(data)
    //     })

    //     // console.log('storeitems',storeItems)
      
    //     for (let i = 0; i < basketItems.length; i++) {
    //       const { quantity, store_item_id } = basketItems[i];
    //     //   // Assuming storeItemPrices is a dictionary containing store_item_id as key and price as value
    //       const price = storeItems[store_item_id-1]
    //     //   console.log(quantity, store_item_id, price || 0)
    //     // console.log(price.price)

    //     //   console.log(storeItems[store_item_id],store_item_id,basketItems[i])

    //       total += (quantity) * (price.price);

    //     }
    //     // console.log(total)
    //     return total.toFixed(2);
    //   };

    //   const retrieveBasketItemNames = (currentBasketItems) => {
    //     axios
    //     .get(`${API}/allstoreitems`)
    //     .then(({data}) => {
            
    //         // console.log('store items dictionary populated')
    //         setStoreItems(data)
    //     })

    //     console.log(currentBasketItems)
    //     // loop through our currentBasketItems
    //     // on each item, compare to our storeItems dictionary
    //     // with each itemName.name, append to our basketItems ?

    //     for(let i = 0;i < currentBasketItems.length; i++){
    //         const currentBasketItem = currentBasketItems[i]
    //         const storeItemID = currentBasketItems[i].store_item_id
    //         const itemName = storeItems[storeItemID-1]
    //         console.log(currentBasketItem,storeItemID,itemName.name)


    //     }

    //   }

    
    // anytime any basket state changes, fetch store items dictionary
     // fetch all store items and store in dictionary for use in total basket price function
    // useEffect(()=>{
    //     axios
    //     .get(`${API}/allstoreitems`)
    //     .then(({data}) => {
    //         // console.log('store items dictionary populated')
    //         setStoreItems(data)
    //     })

    // },[currentBasketItems, currentBasketItemsTotalCount])

    // take in userID, axios, API state from useContext
    // useEffect w/ userID state as depenecy array
    // on page load or userID change, useEffect will fire
    // need current basket number
    // fetch basket information and render on screen
    
 
    // useEffect(() => {
    //    console.log(currentBasket)
    //     retrieveBasketItemNames(currentBasketItems)
    // },[userID, basket, currentBasketItems])

    //on population of state currentBasketItems,
    // fetch the total amunt of basket items, and subtotal
    // // render under header

    // useEffect(() => {
    //     if (currentBasketItems.length){
    //         let basketItemsTotalCount = currentBasketItems.length
    //         setCurrentBasketItemsTotalCount(basketItemsTotalCount)
    //         // console.log(currentBasketItemsTotalCount)
    //         const totalBasketUSD = calculateTotalBasketItemsPrice(currentBasketItems)
    //         setCurrentBasketItemsTotalUSD(totalBasketUSD)
    //     }
        
    // },[currentBasketItems])

    return (
        <>
        <section className='basket-total-container'>
            <span>{`${currentBasket.itemCount} items`}</span>
            <span>{`Subtotal: $${currentBasket.total}`}</span>
        </section>
        <br></br>
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