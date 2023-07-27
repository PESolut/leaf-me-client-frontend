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

    // console.log(basket)

    // const calculateTotalBasketItemsPrice = (basketItems) => {
    //     let total = 0;
    //     if (basketItems && storeItems)
    //     setTotalBasketItems(basketItems.length)

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
    //     console.log(price.price)

    //     //   console.log(storeItems[store_item_id],store_item_id,basketItems[i])

    //       total += (quantity) * (price.price);

    //     }
    //     console.log(total)
    //     return total.toFixed(2);
    //   };
      
    
    // // get our basket items
    // useEffect(() => {
    //     // ensure basket has data
    //     if(basket){
    //         // set basket change state to false to reset the flag that signals an item was added to a cart
    //         setBasketChange(false)
    //         const basketID = basket[0].id
    //         // console.log('basket ID:',basketID,'user ID',userID)
    //         // fetch the baskets store items
    //         axios
    //             .get(`${API}/users/${userID}/basket/${basketID}/storeitems`)
    //             .then(({data})=>{
    //                 setBasketItems(data)
    //             })
    //             .catch((error) => {
    //                 console.error('Error', error)
    //             })
    //     }
    // },[basketChange])

    // // calculate our total basketItems price
    // useEffect(() => {
    //     setBasketChange(false)
    //     // ensure basket items has data and basket has data
    //     if(basketItems && basket && storeItems){
    //         const basketID = basket[0].id
    //         // console.log('basket ID:',basketID,'user ID',userID)
    //         const totalNumberOfBasketItems = basketItems.length
    //         console.log('totalNumberOfBasketItems',totalNumberOfBasketItems)
    //         // console.log('basketItems',basketItems)
    //         const totalBasketItemsPrice = calculateTotalBasketItemsPrice(basketItems, storeItems)
    //         console.log(calculateTotalBasketItemsPrice(basketItems, storeItems))
    //         setSubTotalCartPrice(totalBasketItemsPrice)
    //         console.log(totalBasketItemsPrice)

            
    //     }
    // },[basketChange])

    // fetch all store items and store in dictionary for use in total basket price function
    // useEffect(()=>{
    //     axios
    //     .get(`${API}/allstoreitems`)
    //     .then(({data}) => {
    //         // console.log('store items dictionary populated')
    //         setStoreItems(data)
    //     })

    // },[basketChange])

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