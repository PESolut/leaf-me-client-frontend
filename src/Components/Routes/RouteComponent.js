import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../Pages/Home';
import Dispensaries from '../../Pages/Dispensaries';
import DispensariesProvider from '../../Providers/DispensariesProvider';
import DispensariesShow from '../Dispensaries/DispensariesShow';


const RouteComponent = () => {

    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                {/* DISPENSARIES ROUTES */}
                <Route path="dispensary">
                    <Route index element={<Dispensaries/>} />
                    <Route path=":dispensary_id">
                        <Route
                        index
                        element={
                            <DispensariesProvider>
                                <DispensariesShow/>
                            </DispensariesProvider>
                        }
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default RouteComponent;