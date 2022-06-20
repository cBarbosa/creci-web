import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AddressType, CustomerType } from '../../models/Customer';
import api from '../../services/api';
import {
    ArrowSquareOut,
    CalendarCheck,
    CalendarX,
    DeviceMobile,
    Envelope,
    NotePencil,
    Plus,
    UserCircle,
    X,
    XCircle
} from 'phosphor-react';
import { LoadingSpin } from '../../components/LoadingSpin';
import { toast } from 'react-toastify';
import { CustomerModalEdit } from '../../components/Modals/CustomerModalEdit';
import { ModalCustom } from '../../components/Modals/ModalCustom';
import { AddressModalEdit } from '../../components/Modals/AddressModalEdit';
import { AddressModalAdd } from '../../components/Modals/AddressModalAdd';

export interface ICustomerDetailPageProps {};

const CustomerDetailPage: React.FunctionComponent<ICustomerDetailPageProps> = (props) => {

    const { uuid } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = React.useState<CustomerType | null>(null);
    const [address, setAddress] = React.useState<AddressType | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    const [showModalAddress, setShowModalAddress] = React.useState(false);
    const [showModalCustomer, setShowModalCustomer] = React.useState(false);
    const [showModalDelCustomer, setShowModalDelCustomer] = React.useState(false);
    const [showModalAddAddress, setShowModalAddAddress] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        _getCustomerFromDB();
     }, []);

    const _getCustomerFromDB = async () => {
        api.get(`/api/Customer/${uuid}`).then(result => {
            if(result?.data?.success) {
                setCustomer(result?.data?.data);
            }
       })
       .catch((error) => {
           console.log(error);
       });
    };

    const _handleShowDeleteAddress = async (address: AddressType) => {
        setShowModal(true);
        setAddress(address);
    };

    const _handleShowEditAddress = async (address: AddressType) => {
        setShowModalAddress(true);
        setAddress(address);
    };

    const _handleDeleteCustomer = async () => {
        setLoading(true);

        await api.delete(`api/customer/${uuid}`).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            setShowModalDelCustomer(false);
            navigate(`/app/customer`, { replace: true });
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        setLoading(false);
    };

    const _handleDeleteAddress = async () => {
        setLoading(true);

        await api.delete(`api/customer/address/${address?.uuid}`).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            _getCustomerFromDB();

            setShowModal(false);
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        setLoading(false);
    };

    const _handleResetCustomerForm = async () => {
        setShowModalCustomer(true);
    };

    if(loading) {
        return <LoadingSpin />;
    }

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
                                    {customer?.formatedPhone}
                                    {/* https://wa.me/5599999999999 */}
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
                    </ul>

                    <div className='flex gap-8'>

                        <button
                            className="flex justify-between content-center gap-1 bg-blue-500 text-white active:bg-blue-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 my-5"
                            type="button"
                            onClick={() => _handleResetCustomerForm()}
                        >
                            <NotePencil size={20} color={`white`}/>
                            Editar
                        </button>

                        <button
                            className="flex justify-between content-center gap-1 bg-red-500 text-white active:bg-red-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 my-5"
                            type="button"
                            onClick={() => setShowModalDelCustomer(true)}
                        >
                            <X size={20} color={`white`}/>
                            Excluir
                        </button>

                    </div>

                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">última visita: <time dateTime="2022-01-20 19:00">20 de Janeiro, 2022</time></p>
                </section>

                <section className="col-span-2 mt-6 md:mt-0">
                    <div className="flex justify-between content-center mb-5">
                        <div className="pr-4">
                            {(customer?.addresses !== undefined && customer?.addresses.length > 0) && (<h4 className="text-xl text-gray-600">Lista dos imóveis</h4>)}
                            {(customer?.addresses === undefined || customer?.addresses.length === 0) && (<h4 className="text-xl text-gray-600">Sem imóveis cadastrados</h4>)}
                        </div>

                        <button
                            className="flex justify-between content-center gap-2 bg-blue-500 text-white active:bg-blue-600 font-bold text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModalAddAddress(true)}
                        >
                            <Plus size={20} color={`white`}/>
                            Adicionar
                        </button>
                        
                    </div>

                    {(customer?.addresses !== undefined && customer?.addresses.length > 0)
                    && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-3">
                                            Imóvel
                                        </th>
                                        <th scope="col" className="p-3">
                                            Endereço
                                        </th>
                                        <th scope="col" className="p-3">
                                            Cidade
                                        </th>
                                        <th scope="col" className="p-33">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {customer?.addresses?.map((address, index) => {
                                    return (
                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                <td scope='row' className="p-2 font-medium text-gray-900 whitespace-nowrap">
                                                    {address.title}
                                                </td>
                                                <td scope='row' className="p-3">
                                                    <address className='font-thin'>
                                                        {address.street}, {address.number}<br />
                                                        {address.zipcode}<br />
                                                        {address.neighborhood}
                                                    </address>
                                                </td>
                                                <td scope='row' className="p-3">
                                                    {address.city} / {address.state}
                                                </td>
                                                <td scope='row' className="p-3 flex justify-between gap-2 w-14">
                                                    <div>
                                                        <XCircle size={20} color="red" weight="duotone" className='cursor-pointer' onClick={() => _handleShowDeleteAddress(address)} />
                                                    </div>
                                                    <div>
                                                        <NotePencil size={20} color={`green`} className='cursor-pointer' onClick={() => _handleShowEditAddress(address)} />
                                                    </div>
                                                    <div>
                                                        <Link to={'/app/customer'} className='hover:color'>
                                                            <ArrowSquareOut size={20} color="#737882" weight="duotone" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                        </div>
                    )}
                </section>
            </div>

            {showModal ? (
                <ModalCustom
                    setShowModal={setShowModal}
                    confirmFunction={_handleDeleteAddress}
                    setLoading={setLoading}
                >
                    <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Confirma a exclusão do endereço selecionado?
                        </p>
                        <div>
                            <span className='font-semibold'>{address?.title}</span>
                            <br />
                            <address className='font-light'>
                                {address?.street}, {address?.number}<br />
                                {address?.city} / {address?.state}
                            </address>
                        </div>
                    </div>
                </ModalCustom>
            ) : null}

            {showModalCustomer ?
                <CustomerModalEdit customer={customer!} setShowModal={setShowModalCustomer} setLoading={setLoading} setCustomer={setCustomer} />
                 : null
            }

            {showModalDelCustomer ? (
                <ModalCustom
                    setShowModal={setShowModalDelCustomer}
                    confirmFunction={_handleDeleteCustomer}
                    setLoading={setLoading}
                >
                    <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Confirma a exclusão do cliente?
                        </p>
                    </div>
                </ModalCustom>
            ) : null}

            {showModalAddress ? (
                <AddressModalEdit
                    setShowModal={setShowModalAddress}
                    setLoading={setLoading}
                    address={address!}
                    realoadCustomer={_getCustomerFromDB}
                />
            ) : null}

            {showModalAddAddress ? (
                <AddressModalAdd
                setShowModal={setShowModalAddAddress}
                setLoading={setLoading}
                address={{ customerUuid:uuid } as AddressType}
                realoadCustomer={_getCustomerFromDB} />
            ): null}
        </>
        );
};

export default CustomerDetailPage;
