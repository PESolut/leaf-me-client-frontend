import {useContextProvider } from '../../Providers/Provider.js'
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from 'react';
import BasketItem from './BasketItem.js';
import './BasketIndex.css'

const BasketIndex = () => {
    const [count, setCount] = useState(0);

    const {userID, axios, API, basket, storeItems} = useContextProvider()
    const [currentBasket, setCurrentBasket] = useState ({
        total: null,
        itemCount: null,
        items: [],
        names: []
    })

    // this useEffect will run every 10 seconds, for testing purposes
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(currentBasket)
            console.log("This will run every ten seconds!")

          setCount(count + 1);
        }, 10000); // 10000 milliseconds = 10 seconds
    
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
      }, []); // Empty dependency array, so the effect runs only once on component mount

    // anytime our user changes or our basket changes, lets update our basketitems
    useEffect(()=> {
        if(basket){
            axios
            .get(`${API}/users/${userID}/basket/${basket[0].id}/storeitems`)
            .then(({data}) => {
                setCurrentBasket({
                    total: currentBasket.total,
                    itemCount: currentBasket.itemCount,
                    items: data,
                    names: currentBasket.names
                })
            })
            .catch((error) => {
                console.error(error)
            })
        }
    },[userID, basket])

    // on currentBasketItems change, append total to basket object
    // on currentBasketItems change, fetch basket items
    useEffect(()=> {
        if(currentBasket.items.length > 0){
            const total = (calculateTotalBasketItemsPrice(currentBasket.items))
            const names = (getCurrentBasketNames(currentBasket.items))
            setCurrentBasket({
                total: `${total}`,
                itemCount: currentBasket.itemCount,
                items: currentBasket.items,
                names: names
            })
        }
    },[userID, basket, currentBasket.items])
    // useEffect(()=> {
    //     if(currentBasket.items.length > 0){
    //         const names = (getCurrentBasketNames(currentBasket.items))
    //         setCurrentBasket({
    //             total: currentBasket.total,
    //             itemCount: currentBasket.itemCount,
    //             items: currentBasket.items,
    //             names: names
    //         })
    //     }
    //     console.log(currentBasket.names[0],currentBasket.items[0])
    // },[userID, basket, currentBasket.items, currentBasket.total])

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
        // iterate over basketItems, on each element of basketItem, take values quantity and store_item_id
        // use those to find our store_item.price value and multipy that value by the quantity value
        // return total integer in dollar format
        for (let i = 0; i < basketItems.length; i++) {
          const { quantity, store_item_id } = basketItems[i];
          const currentElPrice = storeItems[store_item_id-1].price * quantity
        total += currentElPrice 
        }
        return total.toFixed(2);
        }
      };

    // get our basket items names and store inside an array. will be later stored in currentBasket.names 
    // in useEffect mounted to currentBasket.items, basket, and userID.
    const getCurrentBasketNames = (basketItems) => {
        let returnArr = []
        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            const storeItems = data
        })
        .catch((error) => {
            console.error(error)
        })
        // iterate over basketItems, on each element of basketItem, take value store_item_id to get currentElName
        for(let i = 0; i < basketItems.length; i++) {
            const { store_item_id } = basketItems[i]
            const currentElName = storeItems[store_item_id-1].name
            returnArr.push(currentElName)
        }
        return returnArr
    }

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