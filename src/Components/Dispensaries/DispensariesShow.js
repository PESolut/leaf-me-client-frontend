import disp1Img from "../../Assets/dis1.png";
import disp2Img from "../../Assets/dis2.png";
import defaultImg from "../../Assets/dis3.png";
import { useEffect, useState } from "react";
import { useDisProvider } from "../../Providers/DispensariesProvider";
import { useContextProvider } from '../../Providers/Provider.js';
import { useParams } from 'react-router-dom';
import "./DispensariesShow.css";
import StoreItemsIndex from "../StoreItems/StoreItemsIndex";

const DispensariesShow = () => {
    const { setDispensaryID, DispensaryID } = useContextProvider();

    const { dispensaries, axios, API, dispensaryItems } = useDisProvider();
    const { dispensary_id } = useParams();
    const [dispensaryInfo, setDispensaryInfo] = useState({});
    const params = useParams()
    // console.log('dispensary:',params.dispensary_id)

    useEffect(() => {
        setDispensaryID(params.dispensary_id)
        // console.log('dispensary ID',DispensaryID)
        // console.log('dispensary ID (useparams)',dispensary_id)
        axios
            .get(`${API}/dispensary/${dispensary_id}`)
            .then(({ data }) => {
                setDispensaryInfo(data);
            })
            .catch((error) => {
                console.error(error);
            });
            
    }, [axios, API, dispensary_id]);

    let cardImage = ""

    if(dispensaryInfo.image === 'image1.jpg'){
        cardImage = disp1Img
    } else if (dispensaryInfo.image === 'image2.jpg'){
        cardImage = disp2Img
    } else {
        cardImage = defaultImg
    }


    return (
        <>
        <div className="container">
        <img
            className="dispensary-one-image"
            src={cardImage}
            />
            <h2 className="dispensary-one-title">{dispensaryInfo.name}</h2>
            {true ? <StoreItemsIndex dispensary_id={dispensary_id}/> : <></>}
        </div>
        <div className="basket-button">

        </div>
        </>
    );
};

export default DispensariesShow;
