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
import InputMask from 'react-input-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { LoadingSpin } from '../../components/LoadingSpin';
import { toast } from 'react-toastify';

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
    const [loading, setLoading] = React.useState(false);

    const _handleShowDeleteAddress = async (address: AddressType) => {
        setShowModal(true);
        setAddress(address);
    };

    const _handleHideDeleteAddress = async () => {
        setShowModal(false);
        setAddress(null);
    };

    const validationCustomerSchema = yup.object().shape({
        name: yup.string().required(`Nome do cliente deve ser informado`).min(5, 'Nome deve conter um nome válido'),
        email: yup.string().email(`Formato de email inválido`).required(`Email deve ser informado`),
        phone: yup.string().notRequired()
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            uuid: uuid,
            name: customer?.name,
            email: customer?.email,
            phone: customer?.phone
        } as CustomerType,
        resolver: yupResolver(validationCustomerSchema)
    });

    React.useEffect(() => {
        api.get(`/api/Customer/${uuid}`).then(result => {
             if(result?.data?.success) {
                 setCustomer(result?.data?.data);
                 reset({
                    uuid: uuid,
                    name: customer?.name,
                    email: customer?.email,
                    phone: customer?.phone
                });
             }
        })
        .catch((error) => {
            console.log(error);
        });
     }, []);

     const onCustomerSubmit = async (data: CustomerType) => {
        setLoading(true);

        await api.post(`api/customer/update`,data).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            setShowModalCustomer(false);
            setCustomer(result?.data?.data);
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        setLoading(false);
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

    const _handleDeleteAddress = async (uuid: string) => {
        setLoading(true);

        await api.delete(`api/customer/address/${uuid}`).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            setShowModal(false);
            // must remove from array
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        setLoading(false);
    };

    const onCustomerError = (error: any) => {
        toast.error(error);
    };

    const _handleResetCustomerForm = async () => {
        reset({
            uuid: uuid,
            name: customer?.name,
            email: customer?.email,
            phone: customer?.phone
        });
        setShowModalCustomer(true);
    };

    const classValues = {
        "inputText": "w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2",
        "button": "inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full",
        "buttonBlue": "w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800",
        "buttonSilver": "w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800",
        "buttonRed": "w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-red-600 border-red-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-red-800"
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
                                    {customer?.phone}
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
                                                        <XCircle size={32} color="red" weight="duotone" onClick={() => _handleShowDeleteAddress(address)} className='cursor-pointer' />
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

                        </div>
                    )}
                </section>
            </div>

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
                                Atenção!
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
                                    Confirma a esclusão do endereço selecionado?
                                    <br/>
                                    <address className='font-light'>
                                        {address?.street}, {address?.number}<br />
                                        {address?.city} / {address?.state}
                                    </address>
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
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => _handleDeleteAddress(address?.uuid!)}
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

            {showModalCustomer ? (
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
                                    Dados do cliente
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModalCustomer(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        <X size={32} color="black" weight="duotone" />
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            
                            <form
                                    onSubmit={handleSubmit(onCustomerSubmit, onCustomerError)}
                                >
                            <div className="flex flex-col w-full px-4 transition duration-500 ease-in-out transform bg-white">
                                
                                    <div className="py-4">
                                        <label className="text-base leading-7 text-blueGray-500">
                                            Nome
                                            <input
                                                type="text"
                                                placeholder="Nome do cliente"
                                                className={classValues.inputText}
                                                {...register('name')}
                                            />
                                        </label>
                                        {errors?.name?.type && (
                                            <div className="text-red-600">
                                                {errors.name.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative py-4">
                                        <label className="text-base leading-7 text-blueGray-500">
                                            Email
                                            <input
                                                type="text"
                                                placeholder="Email do cliente"
                                                className={classValues.inputText}
                                                {...register('email')}
                                            />
                                        </label>
                                        {errors?.email?.type && (
                                            <div className="text-red-600">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative py-4">
                                        <label className="text-base leading-7 text-blueGray-500">
                                            Telefone Móvel
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                className={classValues.inputText}
                                                placeholder="Telefone do cliente Ex: (99) 99999-9999"
                                                alwaysShowMask={false}
                                                maskPlaceholder={null}
                                                {...register('phone')}
                                            />
                                        </label>
                                        {errors?.phone?.type && (
                                            <div className="text-red-600">
                                                {errors.phone.message}
                                            </div>
                                        )}
                                    </div>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModalCustomer(false)}
                                >
                                    Fechar
                                </button>
                                <button
                                    type='button'
                                    className="text-cyan-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => {
                                        reset({
                                            uuid: customer?.uuid,
                                            name : customer?.name,
                                            email: customer?.email,
                                            phone: customer?.phone
                                        });
                                    }}
                                >
                                    Resetar
                                </button>
                                <button
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Confirma
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {showModalDelCustomer ? (
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
                                    Atenção!
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModalDelCustomer(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        <X size={32} color="black" weight="duotone" />
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    Confirma a exclusão do cliente?
                                </p>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModalDelCustomer(false)}
                                >
                                    Fechar
                                </button>
                                <button
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => _handleDeleteCustomer()}
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
                                onClick={() => setShowModalAddress(false)}
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
                                    onClick={() => setShowModalAddress(false)}
                                >
                                    Fechar
                                </button>
                                <button
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModalAddress(false)}
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

export default CustomerDetailPage;
