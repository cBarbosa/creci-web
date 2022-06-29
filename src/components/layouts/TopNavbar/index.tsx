import React from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import LogoIcon from '../../../../assets/images/logo-transparente.png';
import { useAuth } from '../../../hooks/useAuth';
import { ModalCustom } from '../../Modals/ModalCustom';

export const TopNavbar = () => {
  const { handleLogout, user, authenticated } = useAuth();
  const navigate = useNavigate();
  const [showModalLogoff, setShowModalLogoff] = React.useState(false);

  const _handleLogoff = async () => {
    await handleLogout();
  };

  return (
        <>
        <nav className="bg-white shadow" role="navigation">
          <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">

            <div className="mr-4 md:mr-8">
              <a href="/app/dashboard" rel="home">
                <img
                  src={LogoIcon}
                  className={`cursor-pointer duration-500 h-10`}
                />
              </a>
            </div>

            <div className="ml-auto md:hidden">
              <button className="flex items-center px-3 py-2 border rounded" type="button">
                <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
              </button>
            </div>

            <div className="w-full md:w-auto md:flex-grow md:flex md:items-center">
              <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 md:border-0">
                <li>
                  <Link className="block px-4 py-1 md:p-2 lg:px-4 text-blue-600" to={'customer'} title="Clientes" >Clientes</Link>
                </li>
                <li>
                  <Link className="block px-4 py-1 md:p-2 lg:px-4 text-blue-600" to={'address'} title="Imóveis">Imóveis</Link>
                </li>
              </ul>

              <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
                {/* <li>
                  <a className="block px-4 py-1 md:p-2 lg:px-4" href="#" title="Link">Link {authenticated}</a>
                </li> */}
                <li>
                  <span className="block px-4 py-1 md:p-2 lg:px-4 text-blue-600">Corretor: {user?.nome} ({user?.creci})</span>
                </li>
                <li>
                    <span
                      className="block px-4 py-1 md:p-2 lg:px-4 text-red-600 font-semibold cursor-pointer"
                      onClick={() => setShowModalLogoff(true)}
                    >
                      Sair
                    </span>
                </li>
              </ul>

            </div>
          </div>
        </nav>

        {showModalLogoff ? (
              <ModalCustom
                title='CRECI-DF'
                setShowModal={setShowModalLogoff}
                confirmFunction={_handleLogoff}
              >
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        Deseja realmente sair do sistema?
                    </p>
                </div>
              </ModalCustom>
          ) : null}
        </>
    );
};
