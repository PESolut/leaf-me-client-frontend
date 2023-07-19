import React, { useContext, createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Nav from '../Components/App/Nav';
import { useParams } from 'react-router-dom';

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
  const [newBasket, setNewBasket] = useState({
    client_user_id: '',
    dispensary_id: ''
  })
  const [baskets, setBaskets] = useState(null)

  useEffect(() => {

  })


  useEffect(() => {
    if (cookies.authToken) {
      setAuthToken(cookies.authToken);
      setIsSignedIn(true);
    }
    if (cookies.userID) {
      setUserID(cookies.userID);
      setIsSignedIn(true);
    }
    if (cookies.name) {
      setUserName(cookies.name)
      setIsSignedIn(true);
    }
  }, [cookies]);

  useEffect(() => {
    axios.defaults.headers.common["authorization"] = `Bearer ${authToken}`;

  }, [authToken])

  // fetch all the baskets and store inside of a state
  useEffect(() => {
    const cookieUserID = cookies.userID
    axios.defaults.headers.common["authorization"] = `Bearer ${authToken}`;
    axios
      .get(`${API}/users/${cookieUserID}/basket`)
      .then(({ data}) => {
        console.log('data from useEffect fetch for basket on userID / dispensaryID change',data)
        setBasket(data)
      })
      .catch((error) => {
        console.error('ERROR', error)
      })
      console.log('basket:',basket)

  },[userID, dispensaryID])

  const addItemToBasket = async (item, quantity, basket, dispensary_id) => {
    const cookieUserID = cookies.userID;
    console.log('item added to basket: itemID:', item, 'quantityCount:', quantity ,' to dispensary ID:',dispensary_id);
    // get the existing basket or create a new basket
    console.log(basket,'baskets')



    let newBasket = basket || (await createNewBasket(userID, dispensary_id))
    
    // console.log(newBasket[0].dispensary_id,'old basket dispensary id')
    console.log(dispensary_id,'old dispensary_id')
    console.log(newBasket[0],'new basket el 0')
    console.log(newBasket[0].dispensary_id,'new basket el 0 dispensary id')
    console.log(newBasket,'new basket obj')
    console.log(newBasket.dispensary_id,'new basket obj dispensary id')

    // check if newBasket dispensaryID matches our current dispensary_ID, if not, create new
    if (parseInt(newBasket[0].dispensary_id || newBasket.dispensary_id) === parseInt(dispensary_id)) {
      console.log('old basket DOES matches our current dispensary ID')
    } else {
      console.log('old basket DOES NOT match our current dispensary ID')
      // delete the old basket
      console.log('deleting basket ID',newBasket[0].id)
      axios
        .delete(`${API}/users/${cookieUserID}/basket/${newBasket[0].id}`)
        .then(({data}) => {
          console.log('deleted basket item:',data)
        })
        .catch((error) => console.error(error))

        // create another basket
        await createNewBasket(setBasket, dispensary_id)
        console.log('created new basket to match our dispensary_id',basket)

    }
    console.log('ready to create a new basket item')
    // post the basketitem to the basket

    let newBasketItem = {
      quantity : quantity,



    }

    // ensure that fetched newBasket dispensary_id matches our current dispensary_id

    // if it does not , remove that basket then create a new basket

    // next, post the basket store item .

    // if (!baskets) {
    //   await createNewBasket(userID, dispensaryID); // Pass the correct arguments
    //   console.log('no baskets, creating new');
    // }
    // console.log('baskets found:', baskets, 'about to add to one of these baskets');

    // of all the found baskets, we need to find a basket that matches dispensary_ID
  
    // create a basket store item

  };
  
  const createNewBasket = async (setBasket, dispensary_id) => {
    const cookieUserID = cookies.userID;
    console.log('baskets',dispensary_id)

    const newBasket = {
      client_user_id: cookieUserID,
      dispensary_id: dispensary_id
    };

    console.log('basket',newBasket)
  
    axios 
      .post(`${API}/users/${cookieUserID}/basket`, newBasket)
      .then((response) => {
        console.log(response, 'response from post to api/users/userid/basket');
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
          basket,
          baskets,
          setBaskets,
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
        {children}
        <Nav />
      </ContextD.Provider>
    </div>
  );
};

export default Provider;
