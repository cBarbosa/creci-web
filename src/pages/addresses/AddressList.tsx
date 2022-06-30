import React, {
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowSquareOut,
    HouseLine,
    MapPin,
    Plus,
    UserCircle
} from 'phosphor-react';
import { Link } from 'react-router-dom';
import { LoadingSpin } from '../../components/LoadingSpin';
import { GetAddresses } from '../../services/address';
import { AddressType } from '../../models/Address';

export interface IAddressListPageProps {};

const AddressListPage: React.FunctionComponent<IAddressListPageProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAddressesDB();
    }, []);

    const getAddressesDB = async () => {
        GetAddresses(1, 99).then(result => {
            if(result?.data?.success) {
                setAddresses(result?.data?.data?.items);
            }
        })
        .finally(()=> {
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleNavigateTo = async (uuid:string) => {
        navigate(`/app/address/${uuid}`, { replace: true });
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
                    <li>Imóveis</li>
                </ol>
            </nav>

            <div className='p-4 font-thin flex justify-between content-center'>
                {addresses.length == 0 && <span>Nenhum imóvel cadastrado</span>}
                {addresses.length > 0 && <span>Total {addresses.length} Imóveis</span>}
                <div>
                    <button
                        className="flex justify-between content-center gap-2 bg-blue-500 text-white active:bg-blue-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                    >
                        <Plus size={20} color={`white`}/>
                        Adicionar
                    </button>
                </div>
            </div>

            {addresses.map((address, index) => {
                return (
                    <div className='px-3' key={index}>
                        <div
                            onClick={() => handleNavigateTo(address.uuid)}
                            className="p-4 mb-4 rounded-lg flex items-center bg-slate-200 border-2 border-slate-300 shadow-md hover:bg-slate-100 cursor-pointer"
                        >
                            <HouseLine size={72} color="#737882" weight="duotone" />

                            <div className="w-full space-y-1 font-medium">
                                <div>{address.title}</div>
                                <div className="flex text-sm text-gray-500 gap-1">
                                    <MapPin size={18} color="#737882" weight="duotone" />
                                    <span>{address.city} / {address.state}</span>
                                </div>
                                <div className="flex font-light text-sm text-gray-500 gap-1">
                                    <UserCircle size={18} color="#737882" weight="duotone" />
                                    <span>{address.customer?.name}</span>
                                </div>
                                <div className="flex font-light text-sm text-gray-500 gap-1">
                                    <span>{address.schedules?.length} agendamentos</span>
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

export default AddressListPage;
