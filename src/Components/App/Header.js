import "./Header.css"
import { useState } from "react";
import cartIcon from "../../Assets/Icons/shopping-cart.png"
import { useContextProvider } from '../../Providers/Provider.js';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Header = ({userID, basket}) => {
    const { axios, API, basketItems, setBasketItems, basketChange, setBasketChange, setStoreItems, storeItems, setSubTotalCartPrice, subTotalCartPrice, totalBasketItems, setTotalBasketItems } = useContextProvider();
    const navigate = useNavigate();

    const calculateTotalBasketItemsPrice = (basketItems) => {
        let total = 0;
        if (basketItems && storeItems)
        setTotalBasketItems(basketItems.length)

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
        console.log(price.price)

        //   console.log(storeItems[store_item_id],store_item_id,basketItems[i])

          total += (quantity) * (price.price);

        }
        console.log(total)
        return total.toFixed(2);
      };
      
    
    // get our basket items
    useEffect(() => {
        // ensure basket has data
        if(basket){
            // set basket change state to false to reset the flag that signals an item was added to a cart
            setBasketChange(false)
            const basketID = basket[0].id
            // console.log('basket ID:',basketID,'user ID',userID)
            // fetch the baskets store items
            axios
                .get(`${API}/users/${userID}/basket/${basketID}/storeitems`)
                .then(({data})=>{
                    setBasketItems(data)
                })
                .catch((error) => {
                    console.error('Error', error)
                })
        }
    },[basketChange])

    // calculate our total basketItems price
    useEffect(() => {
        setBasketChange(false)
        // ensure basket items has data and basket has data
        if(basketItems && basket && storeItems){
            const basketID = basket[0].id
            // console.log('basket ID:',basketID,'user ID',userID)
            const totalNumberOfBasketItems = basketItems.length
            console.log('totalNumberOfBasketItems',totalNumberOfBasketItems)
            // console.log('basketItems',basketItems)
            const totalBasketItemsPrice = calculateTotalBasketItemsPrice(basketItems, storeItems)
            console.log(calculateTotalBasketItemsPrice(basketItems, storeItems))
            setSubTotalCartPrice(totalBasketItemsPrice)
            console.log(totalBasketItemsPrice)

            
        }
    },[basketChange])

    // fetch all store items and store in dictionary for use in total basket price function
    useEffect(()=>{
        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            // console.log('store items dictionary populated')
            setStoreItems(data)
        })

    },[basketChange])

    const navigateToCart = (userID) => {
        navigate(`/basket`)
    }

    return (
        <div className="header">
            <section className="left-header">
                <h2>Leaf Me</h2>
                {/* <h4>currently signed in as: {userID}</h4> */}
            </section>
            <section className="right-header">
                {/* <button>Basket Button</button> */}
                <img onClick ={()=> navigateToCart(userID)} className="cart-icon"src={cartIcon}>
                </img>
                <span className="cart-text">({totalBasketItems}) ${subTotalCartPrice}</span>
                {/* <span className="cart-text">(1) $13.62</span> */}
            </section>
        </div>
    );
};

export default Header;