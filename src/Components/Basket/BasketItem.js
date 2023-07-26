import './BasketItem.css'
import {useContextProvider } from '../../Providers/Provider.js'
import { useEffect, useState } from 'react';


const BasketItem = ({basketItemObject, basketItemName}) => {
    const  { axios, API , storeItems } = useContextProvider();

    // const basketItemPrice = storeItems[basketItemObject.store_item_id]
    console.log(storeItems[basketItemObject.store_item_id-1].price)

    return (
        <div className='basket-item'>
            {/* <>
            basket_store_item_id {basketItemObject.id} 
            </> */}
            <span>
            item name {basketItemName} 
            </span>
            <section className='basket-details'>
                <span>
                quantity {basketItemObject.quantity}
                </span>
                <span>
                {/* price {basketItemPrice} */}
                {`$${storeItems[basketItemObject.store_item_id-1].price}`}
                </span>

            </section>
            {/* basket price */}
            
           
            
        </div>
    );
};

export default BasketItem;