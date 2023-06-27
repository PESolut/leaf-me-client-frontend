import { useContext, createContext, useState, useEffect } from "react";
import { useContextProvider } from "./Provider.js";
import { useParams } from "react-router-dom";

export const DisContextD = createContext();
export function useDisProvider() {
  return useContext(DisContextD);
}

const DispensariesProvider = ({children}) => {
    const { API, axios } = useContextProvider();
    const [dispensaries, setDispensaries] = useState([])
    const [dispensaryID, setDispensaryID] = useState(null)
    const [dispensaryItems, setDispensaryItems] = useState({}) 

    useEffect(() => {
        axios
            .get(`${API}/dispensary`)
            .then(({ data }) => {
                setDispensaries(data)
                console.log('Dispensaries Provider - populated dispensaries state with API response')
            })
            .catch((error) => console.error(error))
    },[dispensaryID]);
    
    
    return (
        <div>
            <DisContextD.Provider
            value={{
                API,
                axios,
                dispensaries,
                setDispensaries,
                dispensaryID,
                setDispensaryID,
                dispensaryItems,
                setDispensaryItems
            }}>
            {children}
            </DisContextD.Provider>
        </div>
    );
};

export default DispensariesProvider;