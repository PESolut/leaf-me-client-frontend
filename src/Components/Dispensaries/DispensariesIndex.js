import { useDisProvider } from "../../Providers/DispensariesProvider";
import { useContextProvider } from "../../Providers/Provider.js";
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from "uuid";
import DispensariesItem from "./DispensariesItem";

const DispensariesIndex = () => {
    const { dispensaries } = useDisProvider()
    const { API, axios, authToken, setAuthToken, userID, setUserID, isSignedIn, setIsSignedIn } = useContextProvider();
    const [cookies] = useCookies(['authToken']);
    const cookieAuthToken = cookies.authToken;

    // console.log(cookieAuthToken)


    // console.log(dispensaries)
    return (
    
    <>
        {/* <h4>token: {cookieAuthToken}</h4> */}
        <div className="dispensaries-index">
            {
                dispensaries.map(object =>
                    <DispensariesItem
                    key = {uuidv4()}
                    disObject = {object} />
                    )
            }
            
        </div>
    </>
    );
};

export default DispensariesIndex;