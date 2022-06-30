import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { CustomerType } from "../../../models/Customer";
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { X } from "phosphor-react";
import { UpdateCustomer } from "../../../services/customer";

interface CustomerModalEditProps {
    customer: CustomerType;
    setShowModal: (show: boolean) => void;
    setLoading: (loading: boolean) => void;
    setCustomer: (customer: CustomerType) => void;
};

type CustomerEdit = {
    uuid: string;
    name: string;
    email: string;
    phone?: string;
    document?: string;
};

export const CustomerModalEdit = (
    {
        customer,
        setShowModal,
        setLoading,
        setCustomer
    }: CustomerModalEditProps) => {

    const validationCustomerSchema = yup.object().shape({
        name: yup.string().required(`Nome do cliente deve ser informado`).min(5, 'Nome deve conter um nome válido'),
        email: yup.string().email(`Formato de email inválido`).required(`Email deve ser informado`),
        phone: yup.string().notRequired()
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            uuid: customer.uuid,
            name: customer.name,
            email: customer.email,
            phone: customer.formatedPhone,
            document: customer.formatedDocument
        } as CustomerEdit,
        resolver: yupResolver(validationCustomerSchema)
    });

    const onCustomerSubmit = async (data: CustomerEdit) => {
        setLoading(true);

        await UpdateCustomer(data).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            setShowModal(false);
            setCustomer(result?.data?.data);
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

    const classValues = {
        "inputText": "w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2",
        "button": "inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full",
        "buttonBlue": "w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800",
        "buttonSilver": "w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800",
        "buttonRed": "w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-red-600 border-red-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-red-800"
    };

    return (<>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Editar informações do cliente
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

                            <div className="relative py-4">
                                <label className="text-base leading-7 text-blueGray-500">
                                    CPF
                                    <InputMask
                                        mask="999.999.999-99"
                                        className={classValues.inputText}
                                        placeholder="CPF do cliente Ex: 999.999.999-99"
                                        alwaysShowMask={false}
                                        maskPlaceholder={null}
                                        {...register('document')}
                                    />
                                </label>
                                {errors?.document?.type && (
                                    <div className="text-red-600">
                                        {errors.document.message}
                                    </div>
                                )}
                            </div>
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
                            type='button'
                            className="text-cyan-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => {
                                reset({
                                    uuid: customer.uuid,
                                    name : customer.name,
                                    email: customer.email,
                                    phone: customer.phone,
                                    document: customer.document
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
        </>);
};
