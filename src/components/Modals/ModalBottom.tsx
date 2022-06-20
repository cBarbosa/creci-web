import React from "react";

interface ModalBottomProps {
    setShowModal: (show: boolean) => void;
    confirmFunction: () => void;
    setLoading?: (loading: boolean) => void;
};

export const ModalBottom = (
    {
        setShowModal,
        confirmFunction,
        setLoading
    } : ModalBottomProps) => {

    return(
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
            >
                Fechar
            </button>
            <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => confirmFunction()}
            >
                Confirma
            </button>
        </div>
    );

};
