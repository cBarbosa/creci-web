import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingSpin } from '../../components/LoadingSpin';
import { ModalCustom } from '../../components/Modals/ModalCustom';
import { ScheduleType } from '../../models/Schedule';
import { fetchAppointment, fetchAppointmentUpdate } from '../../services/fetchApi';
import {
    DATETIME_FORMAT_OPTIONS,
    STATUS_TUPLE_SIMPLIFIED
} from '../../services/schedule';

export interface IAppointmentNewPageProps {};

const AppointmentNewPage: React.FunctionComponent<IAppointmentNewPageProps> = (props) => {

    const navigate = useNavigate();
    const { qrcode } = useParams();
    const [ loading, setLoading ] = React.useState(false);
    const [ appointment, setAppointment ] = React.useState<ScheduleType>();
    const [ showModal, setShowModal ] = React.useState(false);
    const [ showModalCancel, setShowModalCancel ] = React.useState(false);
    const [ suggest, setSuggest ] = React.useState('');

     const _handleAppointmentConfirm = async () => {
        setLoading(true);
        await fetchAppointmentUpdate({
            uuid: appointment?.uuid,
            status: 2,
            addressUuid: appointment?.address?.uuid,
            customerUuid: appointment?.visitor?.uuid,
            date: appointment?.date,
            time: appointment?.time
        } as ScheduleType).then(result => {
            if(!result.success) {
                toast.error(result.message);
                return;
            }
            setAppointment(result.data);
            toast.success(result.message);
        })
        .catch((error) => {
            toast.error(error);
            console.log(error);
        })
        .finally(() => {
            setShowModal(false);
            setLoading(false);
        });
     };

     const _handleAppointmentCancel = async () => {
        setLoading(true);
        await fetchAppointmentUpdate({
            uuid: appointment?.uuid,
            status: 3,
            addressUuid: appointment?.address?.uuid,
            customerUuid: appointment?.visitor?.uuid,
            date: appointment?.date,
            time: appointment?.time,
            customerSuggest: suggest
        } as ScheduleType).then(result => {
            if(!result.success) {
                toast.error(result.message);
                return;
            }
            setAppointment(result.data);
            toast.success(result.message);
        })
        .catch((error) => {
            toast.error(error);
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
            setShowModalCancel(false);
        });
     };

    const _getInitialData = async () => {
        setLoading(true);
        await fetchAppointment(qrcode!).then(result => {
            if(result.success) {
                setAppointment(result.data);
            } else {
                navigate('/404');
            }
        }).catch((error) => {
            console.log(error);
        }).finally(()=>setLoading(false));
    };

    React.useEffect(() => {
        _getInitialData();
     }, []);

    if(loading) {
        return <LoadingSpin />;
    }
    
    return(
        <>
            <div className='bg-gray-200 print:bg-white md:flex lg:flex xl:flex print:flex md:justify-center lg:justify-center xl:justify-center print:justify-center font-sans'>
                <div className="lg:w-1/12 xl:w-1/4"></div>
                <div className="w-full bg-white lg:w-full xl:w-2/3 lg:mt-20 lg:mb-20 lg:shadow-xl xl:mt-02 xl:mb-20 xl:shadow-xl print:transform print:scale-90">

                    <header className="flex flex-col items-center px-8 pt-20 text-lg text-center bg-white border-t-8 border-sky-700 md:block lg:block xl:block print:block md:items-start lg:items-start xl:items-start print:items-start md:text-left lg:text-left xl:text-left print:text-left print:pt-8 print:px-2 md:relative lg:relative xl:relative print:relative">
                        <img className="w-3/6 h-auto md:w-1/4 lg:ml-12 xl:ml-12 print:px-0 print:py-0" src="../../assets/images/logo-transparente.png" />
                        <div className="flex flex-row mt-12 mb-2 ml-0 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-4xl print:text-2xl lg:ml-12 xl:ml-12">
                            VISITA SEGURA
                            <div className="text-sky-700">
                                <span className="mr-4 text-sm">■</span>#
                            </div>
                            <span className="text-gray-500">{appointment?.uuid.split('-')[0]}</span>
                        </div>
                        <div className="flex flex-col font-semibold lg:ml-12 xl:ml-12 print:text-sm">
                            <span>Data: {appointment?.formatedDate} às {appointment?.formatedTime}</span>
                            <address className='font-thin text-xs'>
                                <span className='font-semibold'>{appointment?.address?.street}, {appointment?.address?.number}</span><br />
                                {appointment?.address?.neighborhood}<br />
                                {appointment?.address?.state} / {appointment?.address?.city}<br />
                                {appointment?.address?.zipcode}
                            </address>
                        </div>
                        <div className="px-8 py-2 mt-16 text-3xl font-bold text-sky-700 border-4 border-sky-700 border-dotted md:absolute md:right-0 md:top-0 md:mr-12 lg:absolute lg:right-0 lg:top-0 xl:absolute xl:right-0 xl:top-0 print:absolute print:right-0 print:top-0 lg:mr-20 xl:mr-20 print:mr-2 print:mt-8">
                            {STATUS_TUPLE_SIMPLIFIED.find(x => x[0] === appointment?.status)?.[1]}
                        </div>
                        <section className="flex flex-col m-12 text-center lg:m-12 md:flex-none md:text-left md:relative md:m-0 md:mt-16 lg:flex-none lg:text-left lg:relative xl:flex-none xl:text-left xl:relative print:flex-none print:text-left print:relative print:m-0 print:mt-6 print:text-sm">
                            
                            <span className="font-extrabold md:hidden lg:hidden xl:hidden print:hidden">
                                CORRETOR
                            </span>
                            
                            <div className="flex flex-col">
                                <span className="font-medium uppercase">
                                    {appointment?.agent?.name}
                                </span>
                                <span>
                                    CRECI: #{("000000000" + appointment?.agent?.creci).slice(-9)}
                                </span>
                                <span>
                                    CNAI: #{("000000000" + appointment?.agent?.cnai).slice(-9)}
                                </span>
                                <span className='hover:underline'>
                                    <a href={`mailto:${appointment?.agent?.email}`}>{appointment?.agent?.email}</a>
                                </span>
                            </div>

                            <span className="mt-12 font-extrabold md:hidden lg:hidden xl:hidden print:hidden">
                                VISITANTE
                            </span>

                            <div className="flex flex-col md:absolute md:right-0 md:text-right lg:absolute lg:right-0 lg:text-right print:absolute print:right-0 print:text-right">
                                <span className="font-medium uppercase">
                                    {appointment?.visitor?.name}
                                </span>
                                <span>
                                    CPF: {appointment?.visitor?.formatedDocument}
                                </span>
                                <span className='hover:underline'>
                                    <a href={`mailto:${appointment?.visitor?.email}`}>{appointment?.visitor?.email}</a>
                                </span>
                            </div>

                        </section>
                    </header>

                    <hr className="border-gray-300 md:mt-8 print:hidden" />
                    {/* <div>
                        <div className="flex justify-center md:p-8 lg:p-20 xl:p-20 print:p-2">
                            <table className="w-full text-left table-auto print:text-sm" id="table-items">
                                <thead>
                                    <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                                    <th className="px-4 py-2">Item</th>
                                    <th className="px-4 py-2 text-right">Qty</th>
                                    <th className="px-4 py-2 text-right">Unit Price</th>
                                    <th className="px-4 py-2 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td className="px-4 py-2 border">Shared Hosting - Simple Plan (Monthly)</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">1</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$2.45</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$2.45</td>
                                    </tr>
                                    <tr className="bg-gray-100 print:bg-gray-100">
                                    <td className="px-4 py-2 border">Domain Registration - coolstory.bro - (100% Free for First Year)</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">1</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$12.00</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$0.00</td>
                                    </tr>
                                    <tr>
                                    <td className="px-4 py-2 border">
                                        Dedicated Server - Eco Boost
                                        <div className="flex flex-col ml-4 text-xs print:hidden">
                                            <span className="flex items-center">Intel® Xeon® Processor E5-1607 v3</span>
                                            <span className="uppercase">32GB DDR4 RAM</span>
                                            <span>1TB NVMe / Raid 1+0</span>
                                            <span>1Gbps Network + CloudFlare DDoS protection</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">1</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$214.99</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$214.99</td>
                                    </tr>
                                    <tr className="bg-gray-100 print:bg-gray-100">
                                    <td className="px-4 py-2 border ">
                                        Dedicated Server - V8 Turbo
                                        <div className="flex flex-col ml-4 text-xs print:hidden">
                                            <span className="flex items-center">AMD EPYC™ 7702P</span>
                                            <span className="uppercase">128GB DDR4 RAM</span>
                                            <span>512GB NVMe / Raid 5</span>
                                            <span>100Mbit Network + CloudFlare DDoS protection</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">1</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$322.45</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$322.45</td>
                                    </tr>
                                    <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black" >
                                    <td className="invisible"></td>
                                    <td className="invisible"></td>
                                    <td className="px-4 py-2 text-right border"><span className="flag-icon flag-icon-hu print:hidden"></span> VAT</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">27%</td>
                                    </tr>
                                    <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black" >
                                    <td className="invisible"></td>
                                    <td className="invisible"></td>
                                    <td className="px-4 py-2 text-right border">TAX</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$145.77</td>
                                    </tr>
                                    <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black" >
                                    <td className="invisible"></td>
                                    <td className="invisible"></td>
                                    <td className="px-4 py-2 font-extrabold text-right border">Total</td>
                                    <td className="px-4 py-2 text-right border tabular-nums slashed-zero">$685.66</td>
                                    </tr>
                                </tbody>
                            </table>  
                        </div>
                    </div> */}

                        <div>

                            {!appointment?.accepted && !appointment?.rejected && (
                                <div className='print:hidden'>
                            
                                    <div className='p-7'>
                                        <button
                                            type="button"
                                            className={`inline-block p-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full`}
                                            onClick={() => setShowModal(true)}
                                        >
                                            Confirmar Visita
                                        </button>
                                    </div>

                                    <div
                                        className="flex items-center my-1 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                    >
                                        <p className="text-center font-semibold mx-2 mb-0">OU</p>
                                    </div>

                                    <div className='p-7'>
                                        <button
                                            type="button"
                                            className={`inline-block p-4 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full`}
                                            onClick={() => setShowModalCancel(true)}
                                        >
                                            Negar Visita
                                        </button>
                                    </div>
                                </div>
                            )}

                        <div className="m-10 print:mb-2 print:mt-2">
                            <h2 className="text-lg font-semibold text-center print:text-sm">Histórico da solicitação</h2>
                            <div className="flex flex-col items-center text-center print:text-sm">
                                <p className="text-xs">
                                    <span className='font-bold'>{new Date(appointment?.created!).toLocaleDateString('pt-BR', DATETIME_FORMAT_OPTIONS)}</span>
                                    <span> ▫ </span>
                                    <span>{appointment?.agent?.name}</span>
                                    <span> ▫ </span>
                                    <span className="italic">Solicitou a visita</span>
                                </p>
                                {appointment?.accepted && (
                                    <p className="text-xs">
                                        <span className='font-bold'>{new Date(appointment?.accepted!).toLocaleDateString('pt-BR', DATETIME_FORMAT_OPTIONS)}</span>
                                        <span> ▫ </span>
                                        <span className='uppercase'>{appointment?.address?.customer?.name}</span>
                                        <span> ▫ </span>
                                        <span className="italic">Aprovou a visita</span>
                                    </p>
                                )}
                                {appointment?.rejected && (
                                    <p className="text-xs">
                                        <span className='font-bold'>{new Date(appointment?.rejected!).toLocaleDateString('pt-BR', DATETIME_FORMAT_OPTIONS)}</span>
                                        <span> ▫ </span>
                                        <span className='uppercase'>{appointment?.visitor?.name}</span>
                                        <span> ▫ </span>
                                        <span className="italic">Negou a visita</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {appointment?.accepted && (
                        <div className="flex flex-col items-center mb-24 leading-relaxed print:mt-0 print:mb-0">
                            <span className="w-96 text-4xl text-center text-black border-b-2 border-black border-dotted opacity-75 print:text-lg font-homemade-apple">
                                {appointment?.address?.customer?.name}
                            </span>
                            <span className="text-center">Proprietário</span>
                        </div>
                    )}

                    <footer className="flex flex-col items-center justify-center pb-20 leading-loose text-white bg-sky-700 print:bg-white print:pb-0">
                        <span className="mt-4 text-base print:text-xs print:mt-0">© 2022 CRECI-DF.  All rights reserved.</span>
                        <span className="text-xs print:text-xs">Setor de Diversões Sul, bloco A, Nº 44, Edifício Boulevard Center, sala 401/410.</span>
                        <span className="text-xs print:text-xs">Brasília/DF. CEP: 70.391-900.</span>
                    </footer>
                </div>
                <div className="lg:w-1/12 xl:w-1/4"></div>
            </div>

            {showModal && (
                <ModalCustom
                    setShowModal={setShowModal}
                    confirmFunction={_handleAppointmentConfirm}
                    setLoading={setLoading}
                    title={`Visita Segura - Aprovar solicitação`}
                >
                    <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Confirma a visita?
                        </p>
                        {/* <div>
                            <span className='font-semibold'>{address?.title}</span>
                            <br />
                            <address className='font-light'>
                                {address?.street}, {address?.number}<br />
                                {address?.city} / {address?.state}
                            </address>
                        </div> */}
                    </div>
                </ModalCustom>
            )}

            {showModalCancel && (
                <ModalCustom
                    setShowModal={setShowModalCancel}
                    confirmFunction={_handleAppointmentCancel}
                    setLoading={setLoading}
                    title={`Visita Segura - Negar solicitação`}
                >
                    <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Confirma a exclusão do endereço selecionado?
                        </p>
                        {/* <div>
                            <span className='font-semibold'>{address?.title}</span>
                            <br />
                            <address className='font-light'>
                                {address?.street}, {address?.number}<br />
                                {address?.city} / {address?.state}
                            </address>
                        </div> */}

                            <div className="relative py-2">
                                <label className="text-base leading-7 text-blueGray-500">
                                    Motivo da recusa
                                    <textarea
                                        className="w-full h-20 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand"
                                        placeholder="Mensagem da recusa..."
                                        value={suggest}
                                        onChange={(evt)=>setSuggest(evt.target.value)}
                                    ></textarea>
                                </label>
                            </div>
                    </div>
                </ModalCustom>
            )}
        </>
    );
};

export default AppointmentNewPage;
