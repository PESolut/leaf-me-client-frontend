import AllStoreItems from "../Components/StoreItems/AllStoreItems";
import { useEffect } from "react";
import { useContextProvider } from '../Providers/Provider';


const Products = () => {
    const { setStoreItems, axios, API, storeItems } = useContextProvider()

    useEffect(()=>{
        axios
        .get(`${API}/allstoreitems`)
        .then(({data}) => {
            // console.log('store items dictionary populated')
            setStoreItems(data)
        })

    },[])


    return (
        <div>
            <AllStoreItems storeItems={storeItems}/>
        </div>
    );
};

export default Products;