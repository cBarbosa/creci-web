import React from 'react';
import {
    CalendarCheck,
    CalendarX,
    DeviceMobile,
    Envelope,
    Eye,
    NotePencil,
    Plus,
    RocketLaunch,
    Trash,
    UserCircle
} from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ModalCustom } from '../../components/Modals/ModalCustom';
import { toast } from 'react-toastify';
import { ScheduleModalAdd } from '../../components/Modals/SheduleModalAdd';
import { ScheduleModalEdit } from '../../components/Modals/ScheduleModalEdit';
import {
    DATETIME_FORMAT_OPTIONS,
    DeleteSchedule, STATUS_TUPLE
} from '../../services/schedule';
import { GetAddressByUUID } from '../../services/address';
import { AddressType } from '../../models/Address';
import { ScheduleType } from '../../models/Schedule';
import { LoadingSpin } from '../../components/LoadingSpin';
import { AlertInfo } from '../../components/Alert/AlertInfo';
import { fetchAppointment } from '../../services/fetchApi';
import { parseISO, isAfter } from 'date-fns';

export interface IAddressDetailPageProps {};

const AddressDetailPage: React.FunctionComponent<IAddressDetailPageProps> = (props) => {

    const { uuid } = useParams();
    const navigate = useNavigate();
    const [address, setAddress] = React.useState<AddressType | null>(null);
    const [schedule, setSchedule] = React.useState<ScheduleType | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    const [showModalSchedule, setShowModalSchedule] = React.useState(false);
    const [showModalNewSchedule, setShowModalNewSchedule] = React.useState(false);
    const [showModalReSendSchedule, setShowModalReSendSchedule] = React.useState(false);
    const [showModalAproved, setShowModalAproved] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const _handleShowDeleteSchedule = async (schedule: ScheduleType) => {
        setShowModal(true);
        setSchedule(schedule);
    };

    const _handleShowEditSchedule = async (schedule: ScheduleType) => {
        setShowModalSchedule(true);
        setSchedule(schedule);
    };

    const _handleShowReSendSchedule = async (schedule: ScheduleType) => {
        setShowModalReSendSchedule(true);
        setSchedule(schedule);
    };

    const _handleDeleteSchedule = async () => {
        setLoading(true);

        await DeleteSchedule(schedule?.uuid!).then(result => {
            if(!result.data.success) {
                toast.error(result.data.message);
                return;
            }
            toast.success(result.data.message);
            getAddressFromUUID();
            setShowModal(false);
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        setLoading(false);
    };

    const _handleReSendSchedule = async () => {
        
    };

    const _handleShowViewSchedule = async (schedule: ScheduleType) => {
        setShowModalAproved(true);
        _fetchSchedule(schedule.uuid!);
    };

    const _fetchSchedule = async (uuid: string) => {
        setLoading(true);
        await fetchAppointment(uuid).then(result => {
            if(result.success) {
                setSchedule(result.data);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(()=>setLoading(false));
    };

    React.useEffect(() => {
        getAddressFromUUID();
     }, []);

    const getAddressFromUUID = async () => {
        setLoading(true);
        await GetAddressByUUID(uuid!).then(result => {
            console.debug('result', result);
            if(result?.data?.success) {
                setAddress(result?.data?.data);
            }
        })
        .catch((error) => {
           console.log(error);
           navigate(`/404`);
        }).finally(()=> {
            setLoading(false);
        });
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
                        <Link to='/app/address' className="text-blue-900 font-bold">Imóveis</Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li>Detalhe</li>
                </ol>
            </nav>

            <div className="px-3 md:gap-8 md:grid md:grid-cols-3">
                
                <section>
                    <div className="flex items-center mb-4 space-x-4 overflow-hidden">
                        <div className="space-y-1">
                            <span className='font-medium uppercase'>{address?.title}</span><br />
                            {address?.street}, {address?.number}<br />
                            {address?.neighborhood}<br />
                            {address?.city} / {address?.state}<br />
                            {address?.zipcode}
                            <Link to={`/app/customer/${address?.customer?.uuid}`} className='underline cursor-pointer'>
                                <div className="flex items-center text-sm text-gray-500 gap-1">
                                        <UserCircle size={20} color="#737882" weight="duotone" />
                                        <span>
                                            {address?.customer?.name}
                                        </span>
                                </div>
                            </Link>
                            <div className="flex items-center text-sm text-gray-500 gap-1">
                                <Envelope size={20} color="#737882" weight="duotone" />
                                <span className='lowercase'>
                                    {address?.customer?.email}
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 gap-1">
                                <DeviceMobile size={20} color="#737882" weight="duotone" />
                                <span>
                                    {address?.customer?.formatedPhone}
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
                        {/* <li className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>Family</li> */}
                    </ul>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">última visita: <time dateTime="2022-01-20 19:00">20 de Janeiro, 2022</time></p>
                </section>

                <section className="col-span-2 mt-6 md:mt-0">
                    <div className="flex justify-between content-center mb-5">
                        <div className="pr-4">
                            {(address?.schedules !== undefined && address?.schedules?.length > 0) && (<h4 className="text-xl font-bold text-gray-600">Lista das visitas</h4>)}
                            {(address?.schedules === undefined || address?.schedules?.length === 0) && (<h4 className="text-xl font-bold text-gray-600">Sem visitas cadastradas</h4>)}
                        </div>

                        <button
                            className="flex justify-between content-center gap-2 bg-blue-500 text-white active:bg-blue-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModalNewSchedule(true)}
                        >
                            <Plus size={20} color={`white`}/>
                            Adicionar
                        </button>
                        
                        {/* <p className="bg-blue-700 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded">8.7</p> */}
                    </div>
                    {/* <p className="mb-2 font-light text-gray-500 ">The flat was spotless, very comfortable, and the host was amazing. I highly recommend this accommodation for anyone visiting Brasov city centre. It's quite a while since we are no longer using hotel facilities but self contained places. And the main reason is poor cleanliness and staff not being trained properly. This place exceeded our expectation and will return for sure.</p>
                    <p className="mb-5 font-light text-gray-500 ">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p> */}

                    {(address?.schedules !== undefined && address?.schedules?.length > 0)
                    && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Data Visita
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Situação
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Visitante
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {address?.schedules?.map((schedule, index) => {
                                    return (
                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {schedule.formatedDate} às {schedule.formatedTime}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {STATUS_TUPLE.find(x => x[0] === schedule.status)?.[1]}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {schedule.visitor?.name ? schedule.visitor?.name : "Anônimo"}
                                                </td>
                                                <td className="px-6 py-4 flex justify-end gap-2">
                                                    {!schedule.accepted && !schedule.rejected && (
                                                        <>
                                                            <div>
                                                                <Trash size={20} color="red" weight="duotone" className='cursor-pointer' onClick={() => _handleShowDeleteSchedule(schedule)}  />
                                                            </div>
                                                            <div>
                                                                <NotePencil size={20} color={`green`} className='cursor-pointer' onClick={() => _handleShowEditSchedule(schedule)} />
                                                            </div>
                                                            <div>
                                                                <RocketLaunch size={20} color="#737882" weight="duotone" className='cursor-pointer' onClick={() => _handleShowReSendSchedule(schedule)} />
                                                            </div>
                                                        </>
                                                    )}

                                                    {schedule.accepted && (
                                                        <div>
                                                            <Eye size={20} color="green" weight="duotone" className='cursor-pointer' onClick={() => _handleShowViewSchedule(schedule)}  />
                                                        </div>
                                                    )}

                                                    {schedule.rejected && (
                                                        <div>
                                                            <Eye size={20} color="green" weight="duotone" className='cursor-pointer' onClick={() => _handleShowViewSchedule(schedule)}  />
                                                        </div>
                                                    )}
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

            {showModal && (
                <ModalCustom
                    setShowModal={setShowModal}
                    confirmFunction={_handleDeleteSchedule}
                    setLoading={setLoading}
                >
                    <>
                        {schedule?.status === 1 && <AlertInfo message={`Aguardando confirmação do cliente`} />}
                        <div className="relative px-10 pb-5 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                Confirma a exclusão da visita selecionada?
                            </p>
                            <div>
                                <span className='font-semibold'>{schedule?.visitor?.name ? schedule?.visitor?.name : "Anônimo"}</span>
                                <br />
                                <section className='font-light'>
                                    {schedule?.formatedDate} às {schedule?.formatedTime}
                                </section>
                            </div>
                        </div>
                    </>
                </ModalCustom>
            )}

            {showModalReSendSchedule && (
                <ModalCustom
                    setShowModal={setShowModalReSendSchedule}
                    confirmFunction={_handleReSendSchedule}
                    setLoading={setLoading}
                    title={`Reenvio do extrato de visita`}
                >
                    <>
                        {schedule?.status === 1 && <AlertInfo message={`Aguardando confirmação do cliente`} />}
                        <div className="relative px-10 pb-5 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                Confirma o reenvio da notificação?
                            </p>
                            <div>
                                <span className='font-semibold'>{schedule?.visitor?.name ? schedule?.visitor?.name : "Anônimo"}</span>
                                <br />
                                <span className='font-normal'>{schedule?.visitor?.email ? schedule?.visitor?.email : "Email não informado"}</span>
                                <br />
                                <section className='font-light'>
                                    {schedule?.formatedDate} às {schedule?.formatedTime}
                                </section>
                            </div>
                        </div>
                    </>
                </ModalCustom>
            )}

            {showModalSchedule && schedule &&(
                <ScheduleModalEdit
                    schedule={
                        {
                            uuid: schedule.uuid,
                            addressUuid: address?.uuid,
                            customerUuid: schedule.visitor?.uuid,
                            formatedTime: schedule.formatedTime,
                            formatedDate: schedule.formatedDate,
                            time: schedule.time,
                            date: schedule.date,
                            status: schedule.status
                        } as ScheduleType}
                    setShowModal={setShowModalSchedule}
                    reload={getAddressFromUUID}
                    setLoading={setLoading}
                />
            )}

            {showModalNewSchedule && (
                <ScheduleModalAdd
                    schedule={{ addressUuid: address?.uuid } as ScheduleType}
                    setShowModal={setShowModalNewSchedule}
                    setLoading={setLoading}
                    reload={getAddressFromUUID}
                />
            )}

            {showModalAproved && (

                <ModalCustom
                    setShowModal={setShowModalAproved}
                    setLoading={setLoading}
                    title={`Extrato da visita`}
                >
                    <>

                    <header className="flex flex-col items-center text-center bg-white md:block lg:block xl:block md:items-start lg:items-start xl:items-start md:text-left lg:text-left xl:text-left md:relative lg:relative xl:relative">
                        
                        <div className="flex flex-col w-screen font-semibold lg:ml-12 xl:ml-12">
                            <span>Data: {schedule?.formatedDate} às {schedule?.formatedTime}</span>
                            <address className='font-thin'>
                                <span className='font-semibold'>{schedule?.address?.street}, {schedule?.address?.number}</span><br />
                                {schedule?.address?.neighborhood}<br />
                                {schedule?.address?.state} / {schedule?.address?.city}<br />
                                {schedule?.address?.zipcode}
                            </address>
                        </div>
                        {/* <div className="px-8 py-2 mt-16 text-3xl font-bold text-sky-700 border-4 border-sky-700 border-dotted md:absolute md:right-0 md:top-0 md:mr-12 lg:absolute lg:right-0 lg:top-0 xl:absolute xl:right-0 xl:top-0 print:absolute print:right-0 print:top-0 lg:mr-20 xl:mr-20 print:mr-2 print:mt-8">
                            {STATUS_TUPLE.find(x => x[0] === schedule?.status)?.[1]}
                        </div> */}
                        <section className="flex flex-col m-12 text-center lg:m-12 md:flex-none md:text-left md:relative md:m-0 md:mt-16 lg:flex-none lg:text-left lg:relative xl:flex-none xl:text-left xl:relative">
                            <span className="font-extrabold">
                                CORRETOR
                            </span>
                            <div className="flex flex-col">
                                <span className="font-medium uppercase">
                                    {schedule?.agent?.name}
                                </span>
                                <span>
                                    CRECI: #{("000000000" + schedule?.agent?.creci).slice(-9)}
                                </span>
                                <span>
                                    CNAI: #{("000000000" + schedule?.agent?.cnai).slice(-9)}
                                </span>
                                <span className='hover:underline'>
                                    <a href={`mailto:${schedule?.agent?.email}`}>{schedule?.agent?.email}</a>
                                </span>
                            </div>

                            
                            <div className="flex flex-col md:absolute md:right-0 md:text-right lg:absolute lg:right-0 lg:text-right">
                                <span className="font-extrabold">
                                    COMPRADOR
                                </span>

                                <span className="font-medium uppercase">
                                    {schedule?.visitor?.name}
                                </span>
                                <span>
                                    CPF: {schedule?.visitor?.formatedDocument}
                                </span>
                                <span className='hover:underline'>
                                    <a href={`mailto:${schedule?.visitor?.email}`}>{schedule?.visitor?.email}</a>
                                </span>
                            </div>

                        </section>
                    </header>

                    <hr className="border-gray-300 md:mt-8" />

                        <div>

                        <div className="m-10">
                            <h2 className="text-lg font-semibold text-center">Histórico da solicitação</h2>
                            <div className="flex flex-col items-center text-center">
                                <p className="text-xs">
                                    <span className='font-bold'>{new Date(schedule?.created!).toLocaleDateString('pt-BR', DATETIME_FORMAT_OPTIONS)}</span>
                                    <span> ▫ </span>
                                    <span>{schedule?.agent?.name}</span>
                                    <span> ▫ </span>
                                    <span className="italic">Solicitou a visita</span>
                                </p>
                                {schedule?.accepted && (
                                    <p className="text-xs">
                                        <span className='font-bold'>{new Date(schedule?.accepted!).toLocaleDateString('pt-BR', DATETIME_FORMAT_OPTIONS)}</span>
                                        <span> ▫ </span>
                                        <span className='uppercase'>{schedule?.address?.customer?.name}</span>
                                        <span> ▫ </span>
                                        <span className="italic">Aprovou a visita</span>
                                    </p>
                                )}
                                {schedule?.rejected && (
                                    <p className="text-xs">
                                        <span className='font-bold'>{new Date(schedule?.rejected!).toLocaleDateString('pt-BR', DATETIME_FORMAT_OPTIONS)}</span>
                                        <span> ▫ </span>
                                        <span className='uppercase'>{schedule?.address?.customer?.name}</span>
                                        <span> ▫ </span>
                                        <span className="italic">Negou a visita</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {schedule?.accepted && (
                        <div className="flex flex-col items-center mb-24 leading-relaxed">
                            <span className="w-96 text-4xl text-center text-black border-b-2 border-black border-dotted opacity-75 font-homemade-apple">
                                {schedule?.address?.customer?.name}
                            </span>
                            <span className="text-center">Proprietário</span>
                        </div>
                    )}

                    {schedule?.rejected && (
                        <div className="flex flex-col items-center mb-24 leading-relaxed">
                            <span className='font-semibold'>Motivo cancelamento</span>
                            <span className="text-center italic">{schedule.customerSuggest}</span>
                        </div>
                    )}

                    </>
                </ModalCustom>
            )}

        </>
        );
};

export default AddressDetailPage;
