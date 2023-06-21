import disp1Img from "../../Assets/dis1.png";
import disp2Img from "../../Assets/dis2.png";
import defaultImg from "../../Assets/dis3.png";
import { useEffect, useState } from "react";
import { useDisProvider } from "../../Providers/DispensariesProvider";
import { useParams } from 'react-router-dom';
import "./DispensariesShow.css";

const DispensariesShow = () => {
    const { dispensaries, axios, API } = useDisProvider();
    const { dispensary_id } = useParams();
    const [dispensaryInfo, setDispensaryInfo] = useState({});

    useEffect(() => {
        axios
            .get(`${API}/dispensary/${dispensary_id}`)
            .then(({ data }) => {
                setDispensaryInfo(data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`${API}`)
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
        </div>
        </>
    );
};

export default DispensariesShow;
