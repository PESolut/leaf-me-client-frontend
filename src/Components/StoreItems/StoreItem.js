import "./StoreItem.css"
import { useParams, Link } from 'react-router-dom';
import "./LinkStyles.css"; // Import the LinkStyles.css file



const StoreItem = ({itemObject}) => {
    const { dispensary_id } = useParams();
    // console.log(itemObject)
    return (
        
        <Link className="link-no-style" to={`/dispensary/${dispensary_id}/store-item/${itemObject.id}`}>
            <div className="store_item_card">
                <span>{itemObject.name}</span>
                <span>{itemObject.description}</span>
                <span>{itemObject.price}</span>
            </div>

        </Link>
    );
};

export default StoreItem;