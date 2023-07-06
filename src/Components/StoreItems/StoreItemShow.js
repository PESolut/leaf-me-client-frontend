import React, { useEffect, useState } from 'react';
import flowerImg from "../../Assets/weedflower2.png"
import defaultImg from "../../Assets/weeddefault.png"
import edibleImg from "../../Assets/weededible.png"
import "./StoreItemShow.css";


import { useDisProvider } from "../../Providers/DispensariesProvider";
import { useParams } from 'react-router-dom';

const StoreItemShow = () => {
    const { dispensary_id, store_item_id } = useParams();
    const { axios, API } = useDisProvider();
    const [dispensaryItem, setDispensaryItem] = useState({})

    useEffect(()=>{
        axios
        .get(`${API}/dispensary/${dispensary_id}/storeitems/${store_item_id}`)
        .then(({ data }) => {
            console.log('Store Item Index  - populated dispensaries items state with API response')
            console.log(dispensary_id,'ID')
            setDispensaryItem(data)
            // console.log(dispensaryItem)
        })
        .catch((error) => console.error(error))
    },[dispensary_id,store_item_id])

    let cardImage = ""

    if(dispensaryItem.type === 'flower'){
        cardImage = flowerImg
    } else if (dispensaryItem.type === 'edible'){
        cardImage = edibleImg
    } else {
        cardImage = defaultImg
    }


    return (
        <div className='container'>
            <img
            className='dispensary-item-image'
            src={cardImage}
            />
            <span className='dispensary-item-details'>{dispensaryItem.name} ({dispensaryItem.type})</span>
        </div>
    );
};

export default StoreItemShow;