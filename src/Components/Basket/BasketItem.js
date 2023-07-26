import './BasketItem.css'


const BasketItem = ({basketItemObject, basketItemName}) => {

    
    return (
        <div className='basket-item'>
            {/* <>
            basket_store_item_id {basketItemObject.id} 
            </> */}
            <span>
            item name {basketItemName} 
            </span>
            <section className='basket-details'>
                <span>
                quantity {basketItemObject.quantity}
                </span>
                <span>
                $23.00
                </span>

            </section>
            {/* basket price */}
            
           
            
        </div>
    );
};

export default BasketItem;