import React, {
    useEffect,
    useState
} from 'react';
import api from '../../services/api';
import {
    CustomerType
} from '../../models/Customer';
import { useNavigate } from 'react-router-dom';
import {
    ArrowSquareOut,
    Envelope,
    ListDashes,
    Plus,
    UserCircle,
    X
} from 'phosphor-react';
import { Link } from 'react-router-dom';
import { LoadingSpin } from '../../components/LoadingSpin';

export interface ICustomersListPageProps {};

const CustomersListPage: React.FunctionComponent<ICustomersListPageProps> = (props) => {
    
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api.get('/api/Customer/paging').then(result => {
            if(result?.data?.success) {
                setCustomers(result?.data?.data?.items);
            }
        })
        .finally(()=> {
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });

    }, []);

    const handleNavigateTo = async (uuid:string) => {
        navigate(`/app/customer/${uuid}`, { replace: true });
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
                    <li>Clientes</li>
                </ol>
            </nav>

            <div className='p-4 font-thin flex justify-between content-center'>
                {customers.length == 0 && <span>Nenhum cliente cadastrado</span>}
                {customers.length > 0 && <span>Total {customers.length} Clientes</span>}
                <div>
                    <button
                        className="flex justify-between content-center gap-2 bg-blue-500 text-white active:bg-blue-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => navigate(`/app/customer/create`, { replace: true })}
                    >
                        <Plus size={20} color={`white`}/>
                        Adicionar
                    </button>
                </div>
            </div>

            {customers.map((customer, index) => {
                return (
                    <div className='px-3' key={index}>
                        <div
                            onClick={() => handleNavigateTo(customer.uuid)}
                            className="p-4 mb-4 rounded-lg flex items-center bg-slate-200 border-2 border-slate-300 shadow-md hover:bg-slate-100 cursor-pointer"
                        >
                            <UserCircle size={72} color="#737882" weight="duotone" />

                            <div className="w-full space-y-1 font-medium">
                                <div>{customer.name}</div>
                                <div className="flex text-sm text-gray-500 gap-1">
                                    <Envelope size={20} color="#737882" weight="duotone" />
                                    <span>{customer.email}</span>
                                </div>
                                <div className="flex font-light text-sm text-gray-500 gap-1">
                                    <ListDashes size={20} color="#737882" weight="duotone" />
                                    <span>{customer.addresses.length} Imóveis cadastrados</span>
                                </div>
                            </div>
                            <div className="right m-auto mr-0">
                                <ArrowSquareOut size={48} color="#737882" weight="duotone" />
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Paginação */}
            <div className="flex items-center justify-center p-3">
                <div className="flex select-none space-x-1 text-gray-700">
                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > Anterior </Link>
                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 1 </Link>
                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 2 </Link>
                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 3 </Link>
                    <span className="rounded-md px-4 py-2"> ... </span>
                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > 10 </Link>
                    <Link to={'#'} className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400" > Próxima </Link>
                </div>
            </div>
        </>
        );
};

export default CustomersListPage;
