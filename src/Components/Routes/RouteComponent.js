import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home';
import Dispensaries from '../../Pages/Dispensaries';
import DispensariesProvider from '../../Providers/DispensariesProvider';
import DispensariesShow from '../Dispensaries/DispensariesShow';
import StoreItemShow from '../StoreItems/StoreItemShow';

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="dispensary">
          <Route index element={<Dispensaries />} />
          <Route path=":dispensary_id">
            <Route
              index
              element={
                <DispensariesProvider>
                  <DispensariesShow />
                </DispensariesProvider>
              }
            />
            <Route
              path="store-item/:store_item_id"
              element={
                <DispensariesProvider>
                  <StoreItemShow/>
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
