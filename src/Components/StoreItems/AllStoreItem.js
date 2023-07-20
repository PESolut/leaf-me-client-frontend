import React from 'react';
import "./AllStoreItem.css"

const AllStoreItem = ({storeItemObject}) => {
    let cardImage = ""

    // console.log(storeItemObject)
    return (
        <div className='store-item-card'>
            <section>
                {/* product image / card image */}
            </section>
            <section>
                {/* text section */}
                <span>{storeItemObject.name}</span>


            </section>
        </div>
    );
};

export default AllStoreItem;