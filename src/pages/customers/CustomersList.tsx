import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

export interface ICustomersListPageProps {};

type CustomerResultType = {
    success: boolean;
    message: string;
    data: object;
};

type CustomerType = {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    addresses: AddressType[];
};

type AddressType = {
    uuid: string;
    state: string;
    zipcode: string;
    lat: number;
    lng: number;
};

const CustomersListPage: React.FunctionComponent<ICustomersListPageProps> = (props) => {

    const [customers, setCustomers] = useState<CustomerType[]>([]);

    useEffect(() => {
       api.get('/api/Customer/paging').then(result => {
            // console.debug('data items',result?.data?.data?.items);
            // console.debug('totalCount', result?.data?.data?.totalCount);
            if(result?.data?.success) {
                console.log('passo 1')
                setCustomers(result?.data?.data?.items);
            }
       })
        .catch((error) => {
         console.log(error);
      });
       
  }, []);

    return (
        <>
            <h1 className="text-2xl font-semibold mb-5">Clientes</h1>

            {customers.map((customer, index) => {
                return (
                    <div key={index} className="p-4 mb-4 rounded-lg flex items-center space-x-4 bg-slate-200">
                        <img className="w-10 h-10 rounded-full ring-2 ring-gray-300" src="https://images.unsplash.com/photo-1520315342629-6ea920342047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                        <div className="space-y-1 font-medium dark:text-gray-500">
                            <div>{customer.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                        </div>
                    </div>
                )
            })}
                
            
        </>
        );
};

export default CustomersListPage;
