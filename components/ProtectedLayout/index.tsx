import React from 'react';
import { Outlet } from 'react-router-dom';

export const ProtectedLayout = () => {

  return (
    <div className='flex'>
        <div className={`w-72 h-screen bg-dark-purple`}>Sidebar</div>
        <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
                <h1>
                    Home Page
                </h1>
        </div>
    </div>
  );
};
