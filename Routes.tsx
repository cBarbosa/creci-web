import React from 'react';
import {
  RouteProps,
  BrowserRouter,
  Route,
  Navigate,
  Routes as RoutesV6,
  Outlet,
} from 'react-router-dom';
import {
  AuthProvider
} from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

import LoginPage from './src/pages/Login';
import MapFormPages from './src/pages/maps/MapFormPage';
import MapPages from './src/pages/maps/MapPage';
import CustomerPage from './src/pages/register/customer';
import SchedulePage from './src/pages/register/schedule';
import App from './src/App';
import CustomersListPage from './src/pages/customers/CustomersList';

export interface IRoute extends RouteProps {
    isPrivate?: boolean
};

function CustomRoute({ isPrivate, ...rest }: IRoute) {
  // const { loading, authenticated } = useAuth();
  // console.debug('CustomRoute', {authenticated, isPrivate, rest});
  console.debug('rest', rest);

  const loading = false;
  const authenticated = false;

  // if (loading) {
  //   return (<h1>Loading...</h1>);
  // }

  // if (isPrivate && !authenticated) {
  //   // return <Redirect to="/login" />
  //   return <Navigate to="/login" replace />;
  // }

  // if(isPrivate === undefined && authenticated) {
  //   return <Redirect to="/home" />
  // }

  return <Route {...rest} />;
}

// const ProtectedRoute = ({ component: Component, ...rest }:any) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return (<AuthWrapper>
//           <Component {...rest} {...props} />
//         </AuthWrapper>);
//       }}
//     />
//   );
// };

// const ProtectedRoute2 = ({ user, children }: any) => {
//   if (!user) {
//     return <Navigate to="/landing" replace />;
//   }

//   return children;
// };


const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/landing',
  children,
}: {
  isAllowed: boolean,
  redirectPath?: string,
  children?: React.ReactNode
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default function Routes() {
  
  return (
    <BrowserRouter>
        <AuthProvider >
          <RoutesV6>
            <Route index element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/app' element={<App />}>
              <Route
                path="customer"
                element={
                    <CustomersListPage />
                }
              />
              <Route
                path="schedule"
                element={
                    <SchedulePage />
                }
              />
            </Route>
            {/* <Route
              path="invoices2"
              element={
                <ProtectedRoute3
                    redirectPath="login"
                    isAllowed={!!user && user?.roles.includes('reader')}
                >
                  <PaginaReader />
                </ProtectedRoute3>
              }
            />
            */}
            {/* <Route
              path="invoices3"
              element={
                <ProtectedRoute
                    redirectPath="login"
                    isAllowed={true}
                >
                  <CustomerPage />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route path='/landing' element={<PaginaLanding />} /> */}
            <Route path='/maps'  >
              <Route index element={<MapPages />}/>
              <Route path='form' element={<MapFormPages />}/>
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
            {/* <Route path='/login' element={<LoginPage/>} /> */}
            {/* <CustomRoute path='/' element={ <LoginPage /> } /> */}
            {/* <CustomRoute path="/login" element={ <LoginPage /> } /> */}
            {/* <CustomRoute isPrivate exact={true} path="/home" component={ Home } />
            <CustomRoute isPrivate exact={true} path="/users" component={ Users } />
            <CustomRoute isPrivate exact={true} path="/contracts/:id" component={ ListContracts } />
            <CustomRoute isPrivate exact={true} path="/contract/:id" component={ Contract } />
            <CustomRoute isPrivate exact={true} path="/contract-add" component={ AddContract } /> */}
          </RoutesV6 >
        </AuthProvider>
    </BrowserRouter>
  );
}
