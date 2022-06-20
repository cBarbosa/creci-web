import React from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import { X } from 'phosphor-react';
import LogoIcon from '../../../../assets/images/logo-transparente.png';
import { useAuth } from '../../../hooks/useAuth';

export const TopNavbar = () => {
  const { handleLogout, user, authenticated } = useAuth();
  const navigate = useNavigate();
  const [showModalLogoff, setShowModalLogoff] = React.useState(false);

  const _handleLogoff = async () => {
    await handleLogout();
    
    navigate(`/login`, { replace: true });
  };

  return (
        <>
        <nav className="bg-white shadow" role="navigation">
          <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">

            <div className="mr-4 md:mr-8">
              <a href="/app" rel="home">
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
                  <a className="block px-4 py-1 md:p-2 lg:px-4 text-blue-600" href="#" title="Imóveis">Imóveis</a>
                </li>
              </ul>

              <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
                <li>
                  <a className="block px-4 py-1 md:p-2 lg:px-4" href="#" title="Link">Link {authenticated}</a>
                </li>
                <li>
                  <span className="block px-4 py-1 md:p-2 lg:px-4 text-blue-600">Corretor: {user?.nome} {user?.creci}</span>
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
              <>
              <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold uppercase">
                              CRECI-DF
                          </h3>
                          <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModalLogoff(false)}
                          >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  <X size={32} color="black" weight="duotone" />
                              </span>
                          </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                  Deseja realmente sair do sistema?
                              </p>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                              <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModalLogoff(false)}
                              >
                                  Fechar
                              </button>
                              <button
                                  className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => _handleLogoff()}
                              >
                                  Confirma
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
        </>
    );
};
