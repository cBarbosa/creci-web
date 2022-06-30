import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { X } from "phosphor-react";
import { STATES_OF_BRAZIL, UpdateAddress } from "../../../services/address";
import { AddressFormData, AddressType } from "../../../models/Address";

interface AddressModalEditProps {
    address: AddressType;
    setShowModal: (show: boolean) => void;
    setLoading: (loading: boolean) => void;
    realoadCustomer?: () => void;
};

export const AddressModalEdit = (
    {
        address,
        setShowModal,
        setLoading,
        realoadCustomer
    }: AddressModalEditProps) => {

    const validationSchema = yup.object().shape({
        title: yup.string().required(`Nome do imóvel deve ser informado`).min(5, 'Nome deve conter um nome válido'),
        state: yup.string().required(`Estado deve ser informado`),
        city: yup.string().required(`Cidade deve ser informado`),
        neighborhood: yup.string().required(`Bairro deve ser informado`),
        street: yup.string().required(`Logradouro deve ser informado`),
        zipcode: yup.string().required(`CEP deve ser informado`)
    });

    const initialValues = {
        uuid: address.uuid,
        title: address.title,
        description: address.description,
        state: address.state,
        street: address.street,
        city: address.city,
        neighborhood: address.neighborhood,
        zipcode: address.zipcode,
        number: address.number,
        customerUuid: address.customerUuid
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onAddressSubmit = async (data: AddressFormData) => {
        setLoading(true);

        await UpdateAddress({
            uuid: data.uuid,
            title: data.title,
            description: data.description,
            state: data.state,
            street: data.street,
            city: data.city,
            neighborhood: data.neighborhood,
            zipcode: data.zipcode,
            number: data.number,
            customerUuid: data.customerUuid
        } as AddressType).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            setShowModal(false);
            if(realoadCustomer) {
                realoadCustomer();
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        setLoading(false);
    };

    const onAddressError = (error: any) => {
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
            <div className="relative w-full my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Editar imóvel do cliente
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
                            onSubmit={handleSubmit(onAddressSubmit, onAddressError)}
                    >
                    <div className="flex flex-col w-full px-4 transition duration-500 ease-in-out transform bg-white">
                        
                            <div className="py-1">
                                <label className="text-base leading-7 text-blueGray-500">
                                    Nome do Imóvel
                                    <input
                                        type="text"
                                        maxLength={70}
                                        placeholder="Nome do imóvel"
                                        className={classValues.inputText}
                                        {...register('title')}
                                    />
                                </label>
                                {errors?.title?.type && (
                                    <div className="text-red-600">
                                        {errors.title.message}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between py-1 gap-2">
                                <div className="w-full">
                                    <label className="text-base leading-7 text-blueGray-500">
                                        CEP
                                        <input
                                            type="text"
                                            placeholder="CEP do imóvel"
                                            maxLength={20}
                                            className={classValues.inputText}
                                            {...register('zipcode')}
                                        />
                                    </label>
                                    {errors?.zipcode?.type && (
                                        <div className="text-red-600">
                                            {errors.zipcode.message}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <label className="text-base leading-7 text-blueGray-500">
                                        Estado
                                        <select
                                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                                            {...register('state')}
                                        >
                                            <option> -=[ Escolha o estado ]=-</option>
                                            {STATES_OF_BRAZIL.map(estado => {
                                                return <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
                                            })}
                                        </select>
                                    </label>
                                    {errors?.state?.type && (
                                        <div className="text-red-600">
                                            {errors.state.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between py-1 gap-2">
                                <div className="w-full">
                                    <label className="text-base leading-7 text-blueGray-500">
                                        Cidade
                                        <input
                                            type="text"
                                            placeholder="Estado do imóvel"
                                            className={classValues.inputText}
                                            {...register('city')}
                                        />
                                    </label>
                                    {errors?.city?.type && (
                                        <div className="text-red-600">
                                            {errors.city.message}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <label className="text-base leading-7 text-blueGray-500">
                                        Bairro
                                        <input
                                            type="text"
                                            placeholder="Bairro do imóvel"
                                            className={classValues.inputText}
                                            {...register('neighborhood')}
                                        />
                                    </label>
                                    {errors?.neighborhood?.type && (
                                        <div className="text-red-600">
                                            {errors.neighborhood.message}
                                        </div>
                                    )}
                                </div>
                                
                            </div>

                            <div className="flex justify-between py-1 gap-2">
                                <div className="w-full">
                                    <label className="text-base leading-7 text-blueGray-500">
                                        Logradouro
                                        <input
                                            type="text"
                                            placeholder="Logradouro do imóvel"
                                            className={classValues.inputText}
                                            {...register('street')}
                                        />
                                    </label>
                                    {errors?.street?.type && (
                                        <div className="text-red-600">
                                            {errors.street.message}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <label className="text-base leading-7 text-blueGray-500">
                                        Número
                                        <input
                                            type="text"
                                            placeholder="Número do imóvel"
                                            className={classValues.inputText}
                                            {...register('number')}
                                        />
                                    </label>
                                    {errors?.number?.type && (
                                        <div className="text-red-600">
                                            {errors.number.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative py-2">
                                <label className="text-base leading-7 text-blueGray-500">
                                        Descrição do imóvel
                                    <textarea
                                        className="w-full h-20 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand"
                                        placeholder="Message..."
                                        {...register('description')}
                                    ></textarea>
                                </label>
                                {errors?.description?.type && (
                                    <div className="text-red-600">
                                        {errors.description.message}
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
                            onClick={() => { reset(initialValues); }}
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
