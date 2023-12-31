import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home';
import Dispensaries from '../../Pages/Dispensaries';
import DispensariesProvider from '../../Providers/DispensariesProvider';
import DispensariesShow from '../Dispensaries/DispensariesShow';
import StoreItemShow from '../StoreItems/StoreItemShow';
import Login from '../../Pages/Login';
import Profile from '../../Pages/Profile';
import Products from '../../Pages/Products';
import Basket from '../../Pages/Basket'
import Register from '../../Pages/Register'

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path='products'>
          <Route index element={<Products/>} />
        </Route>
        <Route path="basket">
          <Route index element={<Basket/>} />
        </Route>
        <Route path='login'>
          <Route index element={<Login/>}/>
        </Route>
        <Route path='register'>
          <Route index element={<Register/>}/>
        </Route>
        <Route path='profile'>
          <Route index element={<Profile/>} />
        </Route>
        {/* <Route path='register'>
          <Route index element={<Register/>}/>
        </Route> */}
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
