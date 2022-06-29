import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { CustomerType } from "../../../models/Customer";
import { toast } from 'react-toastify';
import { X } from "phosphor-react";
import { ScheduleFormData, ScheduleType } from "../../../models/Schedule";
import { CreateSchedule, TIMES_TO_SCHEDULE } from "../../../services/schedule";
import { GetCustomersVisitors } from "../../../services/customer";

interface ScheduleModalAddProps {
    schedule: ScheduleType;
    setShowModal: (show: boolean) => void;
    setLoading: (loading: boolean) => void;
    reload: () => Promise<void>;
};

export const ScheduleModalAdd = (
    {
        schedule,
        setShowModal,
        setLoading,
        reload
    }: ScheduleModalAddProps) => {

    const [customers, setCustomers] = React.useState<CustomerType[]>([]);

    const validationCustomerSchema = yup.object().shape({
        customerUuid: yup.string().required(`Nome do cliente deve ser informado`).min(5, 'Nome deve conter um nome válido'),
        date: yup.date().required(`Data da visita precisa ser informado`).min(new Date, 'Data deve ser maior que a atual'),
        time: yup.string().required(`Hora da visita precisa ser informado`)
    });

    const initialValues = {
        uuid: schedule.uuid,
        customerUuid: '',
        addressUuid: schedule.addressUuid,
        date: '',
        time: '',
    } as ScheduleFormData;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationCustomerSchema)
    });

    const _SaveScheduleDB = async (data: ScheduleType) => {
        await CreateSchedule(data).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });
    };

    const formatDBDate = (inputDate: Date, inputTime: string) : string => {
        return `${inputDate.getFullYear()}-${('0' + (inputDate.getMonth()+1)).slice(-2)}-${('0' + inputDate.getDate()).slice(-2)}T${inputTime}:00.000`;
    };

    const onScheduleSubmit = async (data: ScheduleFormData) => {
        setLoading(true);
        // const dateToDB = data.date.toLocaleDateString("en-US", options);
        // console.debug('onScheduleSubmit->Date', new Intl.DateTimeFormat('en-US', options).format(data.date));
        // console.debug('onScheduleSubmit->DateTZ', `${data.date.getFullYear()}-${('0' + (data.date.getMonth()+1)).slice(-2)}-${('0' + data.date.getDate()).slice(-2)}T${data.time}:00.000`);
        // console.debug('onScheduleSubmit->substr', data.date.toISOString().substr(0, 19).replace('T', ' '));

        await _SaveScheduleDB({
            uuid: data.uuid,
            customerUuid: data.customerUuid,
            addressUuid: data.addressUuid,
            date: formatDBDate(new Date(data.date), data.time)
        } as ScheduleType);
        
        setLoading(false);
        await reload();
        setShowModal(false);
    };

    const onScheduleError = (error: any) => {
        toast.error(error);
    };

    const _getCustomersDB = async () => {
        await GetCustomersVisitors(1, 999).then(result => {
            if(result?.data?.success) {
                setCustomers(result?.data?.data?.items);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    React.useEffect(() => {
        _getCustomersDB();
    }, []);

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
                            Cadastrar nova visita
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
                            onSubmit={handleSubmit(onScheduleSubmit, onScheduleError)}
                    >
                    <div className="flex flex-col w-full px-4 transition duration-500 ease-in-out transform bg-white">

                            <div className="relative py-4">
                                <label className="text-base leading-7 text-blueGray-500">
                                    Visitante
                                    <select
                                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                                        {...register('customerUuid')}
                                    >
                                        <option value=''> -=[ Escolha o visitante ]=-</option>
                                        {customers.map(customer => {
                                            return <option key={customer.uuid} value={customer.uuid}>{customer.name}</option>
                                        })}
                                    </select>
                                </label>
                                {errors?.customerUuid?.type && (
                                    <div className="text-red-600">
                                        {errors.customerUuid.message}
                                    </div>
                                )}
                            </div>

                            <div className="relative pt-4">
                                <label className="text-base leading-7 text-blueGray-500">
                                    Data da Visita
                                    <input
                                        type="date"
                                        placeholder="Data da Visita"
                                        className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                                        {...register('date')}
                                    />
                                </label>
                                {errors?.date?.type && (
                                    <div className="text-red-600">
                                        {errors.date.message}
                                    </div>
                                )}
                            </div>

                            <div className="relative py-4">
                                <label className="text-base leading-7 text-blueGray-500">
                                    Hora da Visita
                                    <select
                                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                                        {...register('time')}
                                    >
                                        <option value=''> -=[ Escolha a hora ]=- </option>
                                        {TIMES_TO_SCHEDULE.map((time, index) => {
                                            return <option key={index} value={time.value}>{time.description}</option>
                                        })}
                                    </select>
                                </label>
                                {errors?.time?.type && (
                                    <div className="text-red-600">
                                        {errors.time.message}
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
                                reset(initialValues);
                            }}
                        >
                            Resetar
                        </button>
                        <button
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            // onClick={() => console.debug('action')}
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
