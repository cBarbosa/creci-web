import React from 'react';
import {
    ArrowSquareOut,
    CalendarCheck,
    CalendarX,
    DeviceMobile,
    Envelope,
    HourglassSimpleMedium,
    NotePencil,
    Plus,
    UserCircle,
    XCircle
} from 'phosphor-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ModalCustom } from '../../components/Modals/ModalCustom';
import { toast } from 'react-toastify';
import { ScheduleModalAdd } from '../../components/Modals/SheduleModalAdd';
import { ScheduleModalEdit } from '../../components/Modals/ScheduleModalEdit';
import {
    DeleteSchedule
} from '../../services/schedule';
import { GetAddressByUUID } from '../../services/address';
import { AddressType } from '../../models/Address';
import { ScheduleType } from '../../models/Schedule';
import { LoadingSpin } from '../../components/LoadingSpin';

export interface IAddressDetailPageProps {};

const AddressDetailPage: React.FunctionComponent<IAddressDetailPageProps> = (props) => {

    const { uuid } = useParams();
    const [address, setAddress] = React.useState<AddressType | null>(null);
    const [schedule, setSchedule] = React.useState<ScheduleType | null>(null);
    
    const [showModal, setShowModal] = React.useState(false);
    const [showModalSchedule, setShowModalSchedule] = React.useState(false);
    const [showModalNewSchedule, setShowModalNewSchedule] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const _handleShowDeleteSchedule = async (schedule: ScheduleType) => {
        setShowModal(true);
        setSchedule(schedule);
    };

    const _handleShowEditSchedule = async (schedule: ScheduleType) => {
        console.debug('_handleShowEditSchedule', schedule);
        setShowModalSchedule(true);
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

    React.useEffect(() => {
        getAddressFromUUID();
     }, []);

    const getAddressFromUUID = async () => {
        GetAddressByUUID(uuid!).then(result => {
            if(result?.data?.success) {
                setAddress(result?.data?.data);
            }
       })
       .catch((error) => {
           console.log(error);
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
                    <div className="flex items-center mb-6 space-x-4">
                        <HourglassSimpleMedium size={48} color="#737882" weight="regular" />
                        <div className="space-y-1 font-medium dark:text-gray-900">
                            <span className='uppercase'>{address?.street}, {address?.number}</span><br />
                            {address?.neighborhood}<br />
                            {address?.city} / {address?.state}<br />
                            {address?.zipcode}
                            <div className="flex items-center text-sm text-gray-500 gap-1">
                                <UserCircle size={20} color="#737882" weight="duotone" />
                                <span>
                                    {address?.customer?.name}
                                </span>
                            </div>
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
                                                    {schedule.status == 1 && ("Aguardando confirmação do cliente")}
                                                    {schedule.status == 2 && ("Cliente aprovou")}
                                                    {schedule.status == 3 && ("Cliente negou")}
                                                    {schedule.status == 4 && ("Cliente propôs nova data")}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {schedule.visitor?.name ? schedule.visitor?.name : "Anônimo"}
                                                </td>
                                                <td className="px-6 py-4 flex justify-end gap-1">
                                                    <div>
                                                        <XCircle size={20} color="red" weight="duotone" className='cursor-pointer' onClick={() => _handleShowDeleteSchedule(schedule)}  />
                                                    </div>
                                                    <div>
                                                        <NotePencil size={20} color={`green`} className='cursor-pointer' onClick={() => _handleShowEditSchedule(schedule)} />
                                                    </div>
                                                    <div>
                                                        <Link to={`/app/address/${address.uuid}`} className='hover:color'>
                                                            <ArrowSquareOut size={20} color="#737882" weight="duotone" />
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

            {showModal && (
                <ModalCustom
                    setShowModal={setShowModal}
                    confirmFunction={_handleDeleteSchedule}
                    setLoading={setLoading}
                >
                    <div className="relative p-6 flex-auto">
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

        </>
        );
};

export default AddressDetailPage;
