import React, { useContext, createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Nav from '../Components/App/Nav';
import { useParams } from 'react-router-dom';
import Header from '../Components/App/Header';

export const ContextD = createContext();
export function useContextProvider() {
  return useContext(ContextD);
}

const API = process.env.REACT_APP_API_URL;

const Provider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['authToken', 'userID', 'name']);
  const [dispensaryID, setDispensaryID] = useState(null)
  const [authToken, setAuthToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userName, setUserName] = useState(null)
  const [basket, setBasket] = useState(null)
  // const [newBasket, setNewBasket] = useState({
  //   client_user_id: '',
  //   dispensary_id: ''
  // })
  // const [baskets, setBaskets] = useState(null)
  const [totalBasketItems, setTotalBasketItems] = useState(0)
  const [subTotalCartPrice, setSubTotalCartPrice] = useState(0)
  const [basketItems, setBasketItems] = useState({})
  const [basketChange, setBasketChange] = useState(false)
  const [storeItems, setStoreItems] = useState({})
  const [userProfileState, setUserProfileState] = useState(0)

  useEffect(() => {
    if (cookies.authToken) {
      setAuthToken(cookies.authToken);
      // setIsSignedIn(true);
    }
    if (cookies.userID) {
      setUserID(cookies.userID);
      // setIsSignedIn(true);
    }
    if (cookies.name) {
      setUserName(cookies.name)
      // setIsSignedIn(true);
    }
  }, [cookies]);

  


  // useEffect(() => {
  //   axios.defaults.headers.common["authorization"] = `Bearer ${authToken}`;

  // }, [authToken])

  // fetch all the baskets and store inside of a state
  useEffect(() => {
    const cookieUserID = cookies.userID
    if(cookieUserID){
      axios
      .get(`${API}/users/${cookieUserID}/basket`)
      .then(({ data}) => {
        setBasket(data)
      })
      .catch((error) => {
        console.error('ERROR', error)
      })
    }
  },[userID])


  const addItemToBasket = async (item, quantity, basket, dispensary_id) => {
    // retrieve the userID
    const cookieUserID = cookies.userID;

    // if its not present, user is not signed in
    if(!cookieUserID){
      alert('You must log in to create a basket');
      return;
    }
    setBasketChange(true)

    console.log(item, quantity, basket, dispensary_id)
    
    // if the current user has no basket, create a new one
    basket = basket || (await createNewBasket(userID, dispensary_id))

    // post the basketitem to the basket
    let newBasketItem = {
      quantity : quantity,
      basket_id: basket[0].id,
      store_item_id: item
    }
    axios
      .post(`${API}/users/${cookieUserID}/basket/${basket[0].id}/storeitems`, newBasketItem)
      .then(({data}) => {
        console.log('posted basket store item:',data)
      })
      .catch((error) => {
        console.error(error)
      })
      // setBasketChange(false)
  };
  
  const createNewBasket = async (setBasket, dispensary_id) => {
    const cookieUserID = cookies.userID;
    const newBasket = {
      client_user_id: cookieUserID,
      dispensary_id: dispensary_id
    };  
    axios 
      .post(`${API}/users/${cookieUserID}/basket`, newBasket)
      .then((response) => {
        setBasket(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <ContextD.Provider
        value={{
          userProfileState,
          setUserProfileState,
          totalBasketItems,
          setTotalBasketItems,
          subTotalCartPrice,
          setSubTotalCartPrice,
          storeItems,
          setStoreItems,
          basketChange,
          setBasketChange,
          basketItems,
          setBasketItems,
          basket,
          // baskets,
          // setBaskets,
          dispensaryID,
          setDispensaryID,
          API,
          axios,
          authToken,
          setAuthToken,
          userID,
          setUserID,
          isSignedIn,
          setIsSignedIn,
          addItemToBasket
        }}
      >
        <Header userID={userID} basket={basket}/>
        {children}
        <Nav />
      </ContextD.Provider>
    </div>
  );
};

export default Provider;
