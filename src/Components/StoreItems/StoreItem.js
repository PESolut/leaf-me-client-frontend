import "./StoreItem.css"

const StoreItem = ({itemObject}) => {
    return (
        <div className="store_item_card">
            <span>{itemObject.name}</span>
            <span>{itemObject.description}</span>
            <span>{itemObject.price}</span>

            
        </div>
    );
};

export default StoreItem;