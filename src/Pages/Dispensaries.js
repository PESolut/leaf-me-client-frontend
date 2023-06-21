import DispensariesIndex from '../Components/Dispensaries/DispensariesIndex';
import DispensariesProvider from "../Providers/DispensariesProvider"

const Dispensaries = () => {
    return (
        <DispensariesProvider>
            <DispensariesIndex/>
        </DispensariesProvider>
    );
};

export default Dispensaries;