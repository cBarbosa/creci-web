import { AddressBook, ArrowSquareOut, CalendarCheck, CalendarX, DeviceMobile, Envelope, Plus, PlusCircle, UserCircle, X, XCircle } from 'phosphor-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CustomerType } from '../../models/Customer';
import api from '../../services/api';

export interface IAddressDetailPageProps {};

const AddressDetailPage: React.FunctionComponent<IAddressDetailPageProps> = (props) => {

    const { uuid } = useParams();
    const [customer, setCustomer] = React.useState<CustomerType | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    const [showModalAddress, setShowModalAddress] = React.useState(false);
    const [uuidDeletion, setUuidDeletion] = React.useState('');

    const _handleShowDeleteAddress = async (uuid: string) => {
        setShowModal(true);
        setUuidDeletion(uuid);
    };

    const _handleHideDeleteAddress = async () => {
        setShowModal(false);
        setUuidDeletion('');
    };

    React.useEffect(() => {
        api.get(`/api/Customer/${uuid}`).then(result => {
             if(result?.data?.success) {
                 setCustomer(result?.data?.data);
                //  setLastPage(result?.data?.)
             }
        })
        .catch((error) => {
            console.log(error);
        });
     }, []);

    return (
        <>

            <nav className="bg-gray-50 p-3 rounded font-sans w-full m-4 ml-0">
                <ol className="list-reset flex text-gray-700">
                    <li>
                        <Link to='/app' className="text-blue-900 font-bold">Home</Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li>
                        <Link to='/app/customer' className="text-blue-900 font-bold">Clientes</Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li>Detalhe</li>
                </ol>
            </nav>

            <div className="px-3 md:gap-8 md:grid md:grid-cols-3">
                
                <section>
                    <div className="flex items-center mb-6 space-x-4">
                        <UserCircle size={48} color="#737882" weight="regular" />
                        <div className="space-y-1 font-medium dark:text-gray-900">
                            <span className='uppercase'>{customer?.name}</span>
                            <div className="flex items-center text-sm text-gray-500 gap-1">
                                <Envelope size={20} color="#737882" weight="duotone" />
                                <span className='lowercase'>
                                    {customer?.email}
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 gap-1">
                                <DeviceMobile size={20} color="#737882" weight="duotone" />
                                <span>
                                    {customer?.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="flex items-center gap-1">
                            <CalendarCheck size={18} color="green" weight="duotone" />
                            <span>3 Visitas concluídas</span>
                        </li>
                        <li className="flex items-center gap-1">
                            <CalendarX size={18} color="red" weight="duotone" />
                            <span>0 Visitas desmarcadas</span>
                        </li>
                        <li className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>Family</li>
                    </ul>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">última visita: <time dateTime="2022-01-20 19:00">20 de Janeiro, 2022</time></p>
                </section>

                <section className="col-span-2 mt-6 md:mt-0">
                    <div className="flex justify-between content-center mb-5">
                        <div className="pr-4">
                            {(customer?.addresses !== undefined && customer?.addresses.length > 0) && (<h4 className="text-xl font-bold text-gray-600">Lista dos imóveis</h4>)}
                            {(customer?.addresses === undefined || customer?.addresses.length === 0) && (<h4 className="text-xl font-bold text-gray-600">Sem imóveis cadastrados</h4>)}
                        </div>

                        <button
                            className="flex justify-between content-center gap-2 bg-blue-500 text-white active:bg-blue-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            <Plus size={20} color={`white`}/>
                            Adicionar
                        </button>
                        
                        {/* <p className="bg-blue-700 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded">8.7</p> */}
                    </div>
                    {/* <p className="mb-2 font-light text-gray-500 ">The flat was spotless, very comfortable, and the host was amazing. I highly recommend this accommodation for anyone visiting Brasov city centre. It's quite a while since we are no longer using hotel facilities but self contained places. And the main reason is poor cleanliness and staff not being trained properly. This place exceeded our expectation and will return for sure.</p>
                    <p className="mb-5 font-light text-gray-500 ">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p> */}

                    {(customer?.addresses !== undefined && customer?.addresses.length > 0)
                    && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Logradouro
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Cidade
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Bairro
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {customer?.addresses?.map((address, index) => {
                                    return (
                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {address.street}, {address.number}
                                                    <br/>{address.zipcode}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {address.city} / {address.state}
                                                </td>
                                                <td className="px-6 py-4">
                                                {address.neighborhood}
                                                </td>
                                                <td className="px-6 py-4 flex justify-end gap-1">
                                                    <div>
                                                        <XCircle size={32} color="red" weight="duotone" onClick={() => _handleShowDeleteAddress(address.uuid)} className='cursor-pointer' />
                                                    </div>
                                                    <div>
                                                        <Link to={'/app/customer'} className='hover:color'>
                                                            <ArrowSquareOut size={32} color="#737882" weight="duotone" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                            {/* Paginação */}
                            {/* <div className="flex items-center justify-center p-3">
                                <div className="flex select-none space-x-1 text-gray-700">
                                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > Anterior </Link>
                                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 1 </Link>
                                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 2 </Link>
                                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 3 </Link>
                                    <span className="rounded-md px-4 py-2"> ... </span>
                                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 10 </Link>
                                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > Próxima </Link>
                                </div>
                            </div> */}

                        </div>
                    )}

                    {/* <aside className="flex items-center mt-3 space-x-5">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline">
                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path></svg>
                            Helpful
                        </a>
                        <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline group">
                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"></path></svg>
                            Not helpful
                        </a>
                    </aside> */}
                </section>
            </div>

            {/* <div className='absolute top-[100px] right-4'>
                <button
                    className="bg-cyan-500 active:bg-cyan-600 uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                >
                    <Plus size={32} color="white" weight="duotone" />
                </button>
            </div> */}

            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Apagar Endereço
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => _handleHideDeleteAddress()}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    <X size={32} color="black" weight="duotone" />
                                </span>
                            </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    Confirma a esclusão das informações?
                                </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => _handleHideDeleteAddress()}
                                >
                                    Fechar
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => _handleHideDeleteAddress()}
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

            {showModalAddress ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Modal Title
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    <X size={32} color="black" weight="duotone" />
                                </span>
                            </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    I always felt like I could do anything. That’s the main
                                    thing people are controlled by! Thoughts- their perception
                                    of themselves! They're slowed down by their perception of
                                    themselves. If you're taught you can’t do anything, you
                                    won’t do anything. I was taught I could do everything.
                                </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Fechar
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
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

export default AddressDetailPage;
