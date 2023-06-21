import { Link } from "react-router-dom";
import disp1Img from "../../Assets/dis1.png"
import disp2Img from "../../Assets/dis2.png"
import defaultImg from "../../Assets/dis3.png"
import "./DispensariesItem.css"
import "./LinkStyles.css"; // Import the LinkStyles.css file


const DispensariesItem = ({ disObject }) => {

    let cardImage = ""
    console.log(disObject.image)

    if(disObject.image === 'image1.jpg'){
        cardImage = disp1Img
    } else if (disObject.image === 'image2.jpg'){
        cardImage = disp2Img
    } else {
        cardImage = defaultImg
    }


    return (
        <Link className="link-no-style" to={`/dispensary/${disObject.id}`}>
          <div className="dispensary-card">
            <img
            className="dispensary-card-image"
            src={cardImage}
            />
            <section className="dispensary-card-details">
            <span className="dispensary-card-title">{disObject.name}</span>
            <span className="dispensary-card-address">{disObject.address}</span>
            </section>
            <section className="dispensary-card-details-2">
                <span className="dispensary-card-fee">{`$${disObject.deliveryfee} Delivery Fee`}</span>
            </section>      
        </div>
        </Link>
    );
};

export default DispensariesItem;