import "./Header.css"
import { useState } from "react";
import cartIcon from "../../Assets/Icons/shopping-cart.png"
import { useContextProvider } from '../../Providers/Provider.js';
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Header = ({userID, basket}) => {
    const { axios, API, storeItems, setStoreItems, basketChange, setBasketChange } = useContextProvider();
    const [currentBasket, setCurrentBasket] = useState ({
        total: null,
        itemCount: null,
        items: []
    })
    const navigate = useNavigate();
    const location = useLocation();


    // on page load, fetch store items, for use on calculating total basket price and single basket item price on basketItem component
    useEffect(() => {
        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            setStoreItems(data)
        })
        .catch((error) => {
            console.error(error)
        })
    },[])

    // anytime our user changes or our basket changes, lets update our basketitems
    useEffect(()=> {
        if(basket){
            setBasketChange(false)
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
    },[userID, basket, currentBasket.itemCount, basketChange])

    // on currentBasketItems change, append total to basket object
    // on currentBasketItems change, fetch basket items
    useEffect(()=> {
        if(currentBasket.items.length > 0){
            const total = (calculateTotalBasketItemsPrice(currentBasket.items))
            setCurrentBasket({
                total: `${total}`,
                itemCount: currentBasket.items.length,
                items: currentBasket.items
            })
        }
    },[userID, basket, currentBasket.items, basketChange])

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

      console.log(currentBasket)


    const navigateToCart = (userID) => {
        navigate(`/basket`)
    }

    // Determine whether to render the cart component
    // going to render out ... button in replacement of the cart icon when on the cart page

    
    const isCartRoute = location.pathname === "/basket";



    return (
        <div className="header">
            <section className="left-header">
                <h2>Leaf Me</h2>
                {/* <h4>currently signed in as: {userID}</h4> */}
            </section>
            <section className="right-header">
                {/* <button>Basket Button</button> */}
                { // going to render out ... button in replacement of the cart icon when on the cart page
                    isCartRoute ? null : 
                    <>
                     <img onClick ={()=> navigateToCart(userID)} className="cart-icon"src={cartIcon}></img>
                     <span className="cart-text">({currentBasket.itemCount}) ${currentBasket.total}</span>
                    </>
                }
                {/* <span className="cart-text">(1) $13.62</span> */}
            </section>
        </div>
    );
};

export default Header;