import { useContext, createContext, useState, useEffect } from "react";
import { useContextProvider } from "./Provider.js";
import { useParams } from "react-router-dom";

export const BasketContext = createContext();
export function useBasketProvider() {
  return useContext(BasketContext);
}

const BasketProvider = ({children}) => {
    const { API, axios } = useContextProvider();

    const addItemToBasket = (item, quantity) => {
        console.log('nice')

    }
    
    return (
        <div>
            <BasketContext.Provider
            value={{
                addItemToBasket

            }}>
            {children}
            </BasketContext.Provider>
        </div>
    );
};

export default BasketProvider;