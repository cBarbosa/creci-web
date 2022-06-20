import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { phoneNumber } from '../../../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { CustomerFormData } from '../../models/Customer';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { LoadingSpin } from '../../components/LoadingSpin';

export interface ICustomerCreatePageProps {};

const CustomerCreatePage: React.FunctionComponent<ICustomerCreatePageProps> = (props) => {

    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const validationSchema = yup.object().shape({
        name: yup.string().required(`Nome do cliente deve ser informado`).min(5, 'Nome deve conter um nome válido'),
        email: yup.string().email(`Formato de email inválido`).required(`Email deve ser informado`),
        // phone: yup.string().matches(phoneNumber, 'Telefone com formato inválido').notRequired()
        phone: yup.string().notRequired()
    });

    const initialValues = {
        name: '',
        email: '',
        phone: ''
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data: CustomerFormData) => {
        setLoading(true);

        await api.put(`api/customer/create`,data).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            navigate(`/app/customer/${result.data.data.uuid}`, { replace: true });
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        setLoading(false);
    };

    const onError = (error: any) => {
        // window.alert(JSON.stringify(error, null, 2));
        toast.error(error);
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
                <ol className="list-none flex text-gray-700">
                    <li>
                        <Link to='/app' className="text-blue-900 font-bold">Home</Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li>
                        <Link to='/app/customer' className="text-blue-900 font-bold">Clientes</Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li>Cadastro</li>
                </ol>
            </nav>

            <div className="container items-center ">
            <form
                className="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2"
                onSubmit={handleSubmit(onSubmit, onError)}
            >

                <div className="relative pt-4">
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

                <div className="relative pt-4">
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

                <div className="relative pt-4">
                    <label className="text-base leading-7 text-blueGray-500">
                        Telefone Móvel
                        <InputMask
                            mask="(99) 99999-9999"
                            className={classValues.inputText}
                            placeholder="Telefone do cliente Ex: (99) 99999-9999"
                            alwaysShowMask={false}
                            maskPlaceholder={null}
                            // maxLength={14}
                            {...register('phone')}
                        />
                    </label>
                    {errors?.phone?.type && (
                        <div className="text-red-600">
                            {errors.phone.message}
                        </div>
                    )}
                </div>

                <div className="flex items-center w-full pt-4 mb-4">
                    <button
                        className={classValues.buttonBlue}
                        type='submit'
                    >
                        Cadastrar Cliente
                    </button>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* <span className="px-4 py-1 mx-auto -mt-8 text-xs text-black transition duration-500 ease-in-out transform bg-gray-200 rounded-lg">
                    Or continue with
                </span> */}

                <div className="flex items-center w-full pt-4 mb-4 space-x-4">
                    <button
                        type='button'
                        className="w-full py-3 text-base text-black transition duration-500 ease-in-out transform bg-slate-400 border-slate-200 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-slate-100"
                        onClick={() => {
                            reset(initialValues, {
                              keepErrors: false, 
                              keepDirty: false,
                              keepIsSubmitted: false,
                              keepTouched: false,
                              keepIsValid: false,
                              keepSubmitCount: false,
                            });
                          }}
                    >
                        Resetar
                    </button>
                    <button
                        type='button'
                        className={classValues.buttonRed}
                        onClick={() => navigate(`/app/customer`, { replace: true })}
                    >
                        Cancelar
                    </button>
                </div>

                {/* <div className="inline-flex items-center justify-between w-full pt-8">
                    <button className="w-auto px-8 py-2 mr-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 hover:bg-blueGray-200 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 focus:border-blueGray-700 focus:bg-blueGray-800 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                        </svg>
                    </button>
                    <button className="w-auto px-8 py-2 mr-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 hover:bg-blueGray-200 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 focus:border-blueGray-700 focus:bg-blueGray-800 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-gitlab" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7z"></path>
                        </svg>
                    </button>
                    <button className="w-auto px-8 py-2 mr-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 hover:bg-blueGray-200 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 focus:border-blueGray-700 focus:bg-blueGray-800 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
                        </svg>
                    </button>
                </div> */}
            </form>
            </div>
        </>
    );
};

export default CustomerCreatePage;
