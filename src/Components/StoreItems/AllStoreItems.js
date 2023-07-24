import "./AllStoreItems.css"
import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useContextProvider } from '../../Providers/Provider';
import { v4 as uuidv4 } from "uuid";
import AllStoreItem from './AllStoreItem';

// on page mount, get all store items; render on screen

const AllStoreItems = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const {API, axios} = useContextProvider()
    const [storeItems, setStoreItems] = useState([])
    const [pageNumber, setPageNumber ] = useState(1)

    const isPageQueryADigit = (pageQuery) => {
        const pageAsInteger = parseInt(pageQuery)
        const digitRegex = /^\d$/;
        return digitRegex.test(pageAsInteger);
      };

    useEffect(() => {
        const page = queryParams.get('page');
        console.log('page',page)
        if (!isPageQueryADigit(page)){
            setPageNumber(1)
        }
        setPageNumber(page)
        console.log('page number',pageNumber)
        
    },[pageNumber, storeItems])

    useEffect(()=>{

        if (!isPageQueryADigit(page)){
            setPageNumber(1)
        }
        axios
        .get(`${API}/allstoreitems?page=${pageNumber}`)
        .then(({data}) => {
            // console.log('store items dictionary populated')
            setStoreItems(data)
        })

    },[pageNumber,page])


    return (
        <div className='products-container'>
                {
                    storeItems ? storeItems.map(object =>
                        <AllStoreItem
                        key = {uuidv4()}
                        storeItemObject = {object} />
                        ) : <></>
                    
                }
        </div>
    );
};

export default AllStoreItems;