import DispensariesIndex from '../Components/Dispensaries/DispensariesIndex';
import DispensariesProvider from "../Providers/DispensariesProvider"
import BasketProvider from '../Providers/BasketProvider';

const Dispensaries = () => {
    return (
        <DispensariesProvider>
            <DispensariesIndex/>
        </DispensariesProvider>
    );
};

export default Dispensaries;