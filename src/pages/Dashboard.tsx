import {
    CalendarBlank,
    CalendarCheck,
    CalendarX,
    UserCircle
} from 'phosphor-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertInfo } from '../components/Alert/AlertInfo';
import { ScheduleWeek } from '../components/layouts/ScheduleWeek';
import { useAuth } from '../hooks/useAuth';

export interface IDashboardPageProps {};

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = (props) => {

    const { user } = useAuth();

    return(
        <>
            <nav className="bg-gray-50 p-3 rounded font-sans w-full m-4 ml-0">
                <ol className="list-reset flex text-gray-700">
                    <li>
                        <Link to='/app' className="text-blue-900 font-bold">Home</Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li>Dashboard</li>
                </ol>
            </nav>

            <AlertInfo message='Verifique junto ao CRECI as informações de pagamento.' />

            <div className="flex items-center bg-gray-200 text-gray-800">
                <div className="p-4 w-full">
                    <div className="grid grid-cols-12 gap-4">
                    
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                            <UserCircle size={32} />
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">Clientes</div>
                            <div className="font-bold text-lg">1259</div>
                        </div>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                            <CalendarCheck size={32} />
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">Concluídas</div>
                            <div className="font-bold text-lg">230</div>
                        </div>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                            <CalendarBlank size={32} />
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">Em andamento</div>
                            <div className="font-bold text-lg">190</div>
                        </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                            <CalendarX size={32} />
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                            <div className="text-sm text-gray-500">Canceladas</div>
                            <div className="font-bold text-lg">32</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>


            <ScheduleWeek />
        </>
    );
};

export default DashboardPage;
