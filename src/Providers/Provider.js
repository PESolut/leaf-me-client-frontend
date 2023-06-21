import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const ContextD = createContext();
export function useContextProvider() {
  return useContext(ContextD);
}

const API = process.env.REACT_APP_API_URL;


const Provider = ({children}) => {
    return (
        <div>
            <ContextD.Provider
            value={{
                API,
                axios

            }}>
            {children}
            </ContextD.Provider>
        </div>
    );
};

export default Provider;