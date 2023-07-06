import { v4 as uuidv4 } from "uuid";
import { useParams } from 'react-router-dom';
import { useDisProvider } from "../../Providers/DispensariesProvider";
import StoreItem from "./StoreItem";
import "./StoreItemsIndex.css"
import { useEffect, useState } from "react";

const StoreItemsIndex = () => {
    const { axios, API } = useDisProvider();
    const { dispensary_id } = useParams();
    const [dispensaryItems, setDispensaryItems] = useState({}) 

    useEffect(()=>{
        axios
        .get(`${API}/dispensary/${dispensary_id}/storeitems`)
        .then(({ data }) => {
            console.log('Store Item Index  - populated dispensaries items state with API response')
            console.log(dispensary_id,'ID')
            setDispensaryItems(data)
            console.log(dispensaryItems)
        })
        .catch((error) => console.error(error))

    },[dispensary_id])

    console.log(dispensaryItems)
    
   

    return (
        <div className="store_item_container">
            
            {dispensaryItems && Object.keys(dispensaryItems).length > 0 ? (
                Object.values(dispensaryItems).map((object) => (
                <StoreItem key={uuidv4()} itemObject={object} />
                ))
    ) : (
      <span>Loading...</span>
    )}
        </div>
    );
};

export default StoreItemsIndex;