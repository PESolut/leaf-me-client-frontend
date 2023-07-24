import AllStoreItems from "../Components/StoreItems/AllStoreItems";
import { useEffect } from "react";
import { useContextProvider } from '../Providers/Provider';
import PageButtons from "../Components/StoreItems/PageButtons";


const Products = () => {
    const { setStoreItems, axios, API, storeItems } = useContextProvider()

    useEffect(()=>{
        // axios
        // .get(`${API}/allstoreitems`)
        // .then(({data}) => {
        //     // console.log('store items dictionary populated')
        //     setStoreItems(data)
        // })

    },[])


    return (
        <div>
            <AllStoreItems storeItems={storeItems}/>
            <PageButtons/>
        </div>
    );
};

export default Products;