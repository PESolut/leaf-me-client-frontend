import { useDisProvider } from "../../Providers/DispensariesProvider";
import { v4 as uuidv4 } from "uuid";
import DispensariesItem from "./DispensariesItem";

const DispensariesIndex = () => {
    const { dispensaries } = useDisProvider()
    console.log(dispensaries)
    return (
    
    <>
        <h2>Dispensaries</h2>
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