import './BasketItem.css'
import {useContextProvider } from '../../Providers/Provider.js'
import { useEffect, useState } from 'react';
import QuantityButton from './QuantityButton';


const BasketItem = ({basketItemObject, basketItemName, updateQuantityInBasketItem, removeItemFromBasket}) => {
    const  { axios, API , storeItems } = useContextProvider();
    const [basketItemPrice, setBasketItemPrice] = useState(0.00)

    useEffect(() => {
        const itemPrice = (storeItems[basketItemObject.store_item_id-1].price)*(basketItemObject.quantity)
        setBasketItemPrice(itemPrice)
        // console.log(itemPrice)
    },[basketItemObject,basketItemObject.quantity])

    return (
        <div className='basket-item'>
            <>
            basket_store_item_id {basketItemObject.id} 
            </>
            <span>
            item name {basketItemName} 
            </span>
            <section className='basket-details'>
                <span>
                    <QuantityButton removeItemFromBasket={removeItemFromBasket} updateQuantityInBasketItem={updateQuantityInBasketItem} basketItemObject={basketItemObject}/>
                {/* quantity {basketItemObject.quantity} */}
                </span>
                <span>
                {/* price {basketItemPrice} */}
                {`$${(basketItemPrice).toFixed(2)}`}
                </span>

            </section>
            {/* basket price */}
            
           
            
        </div>
    );
};

export default BasketItem;