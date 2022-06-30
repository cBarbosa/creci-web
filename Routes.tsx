import React from 'react';
import {
  Route,
  Navigate,
  Routes as RoutesV6,
  Outlet,
} from 'react-router-dom';
import { useAuth } from './src/hooks/useAuth';

import LoginPage from './src/pages/Login';
import MapFormPages from './src/pages/maps/MapFormPage';
import MapPages from './src/pages/maps/MapPage';
import SchedulePage from './src/pages/register/schedule';
import App from './src/App';
import CustomersListPage from './src/pages/customers/CustomersList';
import CustomerDetailPage from './src/pages/customers/CustomerDetail';
import DashboardPage from './src/pages/Dashboard';
import ProfilePage from './src/pages/external/Profile';
import AppointmentPage from './src/pages/external/Appointment';
import NotFoundPage from './src/pages/404';
import ForbidenPage from './src/pages/403';
import CustomerCreatePage from './src/pages/customers/CustomerCreate';
import AddressDetailPage from './src/pages/addresses/AddressDetail';
import AddressListPage from './src/pages/addresses/AddressList';
import { LoadingSpin } from './src/components/LoadingSpin';

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/forbiden',
  children,
}: {
  isAllowed: boolean,
  redirectPath?: string,
  children?: JSX.Element
}) => {

  console.debug('ProtectedRoute', isAllowed);

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default function Routes() {

  const { authenticated, loading } = useAuth();

  if(loading) {
    return <LoadingSpin />;
  }

  return (
    
          <RoutesV6>
            <Route index element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/app' element={
              <ProtectedRoute isAllowed={authenticated} redirectPath={'/forbiden'} >
                <App />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage/>}/>
              <Route path='customer' element={<CustomersListPage/>}/>
              <Route path='customer/:uuid' element={<CustomerDetailPage/>} />
              <Route path='customer/create' element={<CustomerCreatePage/>} />
              <Route path='address' element= {<AddressListPage/>}/>
              <Route path='address/:uuid' element={<AddressDetailPage/>} />
            </Route>

            <Route path='/schedule' element={<SchedulePage />}/>
            

            <Route path='/maps'  >
              <Route index element={<MapPages />} />
              <Route path='form' element={<MapFormPages />} />
            </Route>
            <Route path='/query'  >
              {/* <Route index element={<MapPages />}/> */}
              <Route path='profile/:qrcode' element={<ProfilePage />} />
              <Route path='appointment/:qrcode' element={<AppointmentPage />} />
            </Route>
            
            <Route path="/forbiden" element={<ForbidenPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path='/login' element={<LoginPage/>} /> */}
            {/* <CustomRoute path='/' element={ <LoginPage /> } /> */}
            {/* <CustomRoute path="/login" element={ <LoginPage /> } /> */}
            {/* <CustomRoute isPrivate exact={true} path="/home" component={ Home } />
            <CustomRoute isPrivate exact={true} path="/users" component={ Users } />
            <CustomRoute isPrivate exact={true} path="/contracts/:id" component={ ListContracts } />
            <CustomRoute isPrivate exact={true} path="/contract/:id" component={ Contract } />
            <CustomRoute isPrivate exact={true} path="/contract-add" component={ AddContract } /> */}
          </RoutesV6>
  );
}
