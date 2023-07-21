import {useContextProvider } from '../../Providers/Provider.js'
import { useEffect, useState } from 'react';

const BasketIndex = () => {
    const {userID, axios, API, basket} = useContextProvider()
    const [currentBasket, setCurrentBasket] = useState({})

    useEffect(()=> {

        if(basket){
            axios
            .get(`${API}/users/${userID}/basket/${basket[0].id}/storeitems`)
            .then(({data}) => {
                setCurrentBasket(data)
            })
            .catch((error) => {
                console.error(error)
            })
        }

    },[userID, basket])


    // take in userID, axios, API state from useContext
    // useEffect w/ userID state as depenecy array
    // on page load or userID change, useEffect will fire
    // need current basket number
    // fetch basket information and render on screen
    

    

    return (
        <div>
            
        </div>
    );
};

export default BasketIndex;