import React from 'react';

export const ScheduleWeek = () => {
  
  return (
        <>
            <div className="flex justify-center p-16 bg-gray-100">
                <div className="bg-white rounded-lg w-2/3 lg:w-1/2 xl:w-1/3 p-4 shadow">
                    <div>
                    <span className="text-gray-900 relative inline-block date uppercase font-medium tracking-widest">Quarta-feira, 8</span>
                    <div className="flex mb-2">
                        <div className="w-2/12">
                        <span className="text-sm text-gray-600 block">8:00</span>
                        <span className="text-sm text-gray-600 block">9:00</span>
                        </div>
                        <div className="w-1/12">
                        <span className="bg-blue-400 h-2 w-2 rounded-full block mt-2"></span>
                        </div>
                        <div className="w-9/12">
                        <span className="text-sm font-semibold block">Casa Condominio Sul</span>
                        <span className="text-sm">Charles Barbosa (apt. 1023)</span>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-2/12">
                        <span className="text-sm text-gray-600 block">10:00</span>
                        <span className="text-sm text-gray-600 block">12:00</span>
                        </div>
                        <div className="w-1/12">
                        <span className="bg-red-400 h-2 w-2 rounded-full block mt-2"></span>
                        </div>
                        <div className="w-9/12">
                        <span className="text-sm font-semibold block">Casa Condominio Norte</span>
                        <span className="text-sm">Vanessa Camargo (cs 89)</span>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-2/12">
                        <span className="text-sm text-gray-600 block">15:00</span>
                        <span className="text-sm text-gray-600 block">16:30</span>
                        </div>
                        <div className="w-1/12">
                        <span className="bg-indigo-600 h-2 w-2 rounded-full block mt-2"></span>
                        </div>
                        <div className="w-9/12">
                        <span className="text-sm font-semibold block">Setopr de manões Park Way </span>
                        <span className="text-sm">Edson Marques(cs 54)</span>
                        </div>
                    </div>
                    </div>
                    <div>

                    <span className="text-gray-900 relative inline-block date uppercase font-medium tracking-widest">Quinta-faira, 9</span>
                    <div className="flex mb-2">
                        <div className="w-2/12">
                        <span className="text-sm text-gray-600 block">8:00</span>
                        <span className="text-sm text-gray-600 block">9:15</span>
                        </div>
                        <div className="w-1/12">
                        <span className="bg-blue-400 h-2 w-2 rounded-full block mt-2"></span>
                        </div>
                        <div className="w-9/12">
                        <span className="text-sm font-semibold block">Setor de habitações sul</span>
                        <span className="text-sm">Lêda Marta</span>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-2/12">
                        <span className="text-sm text-gray-600 block">17:00</span>
                        <span className="text-sm text-gray-600 block">18:30</span>
                        </div>
                        <div className="w-1/12">
                        <span className="bg-yellow-400 h-2 w-2 rounded-full block mt-2"></span>
                        </div>
                        <div className="w-9/12">
                        <span className="text-sm font-semibold block">Setor Noroeste</span>
                        <span className="text-sm">Bruno Bissoli</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};
