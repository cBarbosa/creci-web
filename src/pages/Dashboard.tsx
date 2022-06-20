import React from 'react';
import { useAuth } from '../hooks/useAuth';

export interface IDashboardPageProps {};

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = (props) => {

    const { user } = useAuth();

    return(
        <>
            <h1>Dashboard</h1>
            <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
                <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
            </div>
            {user?.nome}

            <div className="flex h-screen items-center">
                <div className="px-10 mx-auto container align-middle">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="shadow rounded-lg py-3 px-5 bg-white">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                            <h6 className="text-2xl">Movies viewed</h6>
                            <h4 className="text-black text-4xl font-bold text-left">33</h4>
                            </div>
                            <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#14B8A6"
                                strokeWidth="2"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                />
                            </svg>
                            </div>
                        </div>
                        <div className="text-left flex flex-row justify-start items-center">
                            <span className="mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#14B8A6"
                                strokeWidth="2"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            </span>
                            <p><span className="text-teal-500 font-bold">3%</span> in 7 days</p>
                        </div>
                        </div>
                        <div className="shadow rounded-lg py-3 px-5 bg-white">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                            <h6 className="text-2xl">Serials viewed</h6>
                            <h4 className="text-black text-4xl font-bold text-left">41</h4>
                            </div>
                            <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#EF4444"
                                strokeWidth="2"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                />
                            </svg>
                            </div>
                        </div>
                        <div className="text-left flex flex-row justify-start items-center">
                            <span className="mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#EF4444"
                                strokeWidth="{2}"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                />
                            </svg>
                            </span>
                            <p><span className="text-red-500 font-bold">12%</span> in 7 days</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </>
    );
};

export default DashboardPage;
